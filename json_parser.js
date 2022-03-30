const ValueTypeEnum = Object.freeze({
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  LIST: "list",
  OBJECT: "object",
});

const getType = (value) => (Array.isArray(value) ? "list" : typeof value);

class ValueSchema {
  constructor({ key, value }) {
    this.key = key;
    this.type = getType(value);
    this.listItemType = undefined;
    this.attributes = {};
    this.attributeIds = [];
  }
}

const getSchemaFromValue = (value, key) => {
  if (value === null || value === undefined) {
    throw new Error(`Cannot be used with nullish value like: ${value}`);
  }
  const expectedValue = new ValueSchema({ key, value });
  if (expectedValue.type === "object") {
    Object.entries(value).forEach(([k, v]) => {
      expectedValue.attributes[k] = getSchemaFromValue(v, k);
      expectedValue.attributeIds.push(k);
    });
  }
  if (expectedValue.type === "list" && value.length) {
    expectedValue.listItemType = typeof value[0];
  }
  if (expectedValue?.listItemType === "object") {
    Object.entries(value[0]).forEach(([k, v]) => {
      expectedValue.attributes[k] = getSchemaFromValue(v, k);
      expectedValue.attributeIds.push(k);
    });
  }
  return expectedValue;
};

module.exports = {
  getSchemaFromValue,
  ValueTypeEnum,
};

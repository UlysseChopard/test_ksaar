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
    throw new Error(`Cannot be used with null or undefined value: ${value}`);
  }
  const schema = new ValueSchema({ key, value });
  if (schema.type === "list" && value.length) {
    schema.listItemType = typeof value[0];
  }
  if (schema?.listItemType === "object" || schema.type === "object") {
    const nestedValue = schema.type === "object" ? value : value[0];
    Object.entries(nestedValue).forEach(([k, v]) => {
      schema.attributes[k] = getSchemaFromValue(v, k);
      schema.attributeIds.push(k);
    });
  }
  if (key === "result") console.log(schema);
  return schema;
};

module.exports = {
  getSchemaFromValue,
  ValueTypeEnum,
};

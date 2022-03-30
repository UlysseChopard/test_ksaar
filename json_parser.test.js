const { getSchemaFromValue, ValueTypeEnum } = require("./json_parser");

test("Number", () => {
  const input = 34;
  const schema = getSchemaFromValue(input, "result");

  const expectedValue = {
    key: "result",
    type: ValueTypeEnum.NUMBER,
    listItemType: undefined,
    attributes: {},
    attributeIds: [],
  };

  expect(schema).toEqual(expectedValue);
});

test("String", () => {
  const input = "35";
  const schema = getSchemaFromValue(input, "result");

  const expectedValue = {
    key: "result",
    type: ValueTypeEnum.STRING,
    listItemType: undefined,
    attributes: {},
    attributeIds: [],
  };

  expect(schema).toEqual(expectedValue);
});

test("Boolean", () => {
  const input = true;
  const schema = getSchemaFromValue(input, "result");

  const expectedValue = {
    key: "result",
    type: ValueTypeEnum.BOOLEAN,
    listItemType: undefined,
    attributes: {},
    attributeIds: [],
  };

  expect(schema).toEqual(expectedValue);
});

test("Object", () => {
  const input = { number: 34, string: "abc" };
  const schema = getSchemaFromValue(input, "result");

  const expectedValue = {
    key: "result",
    type: ValueTypeEnum.OBJECT,
    listItemType: undefined,
    attributes: {
      number: {
        key: "number",
        type: ValueTypeEnum.NUMBER,
        listItemType: undefined,
        attributes: {},
        attributeIds: [],
      },
      string: {
        key: "string",
        type: ValueTypeEnum.STRING,
        listItemType: undefined,
        attributes: {},
        attributeIds: [],
      },
    },
    attributeIds: ["number", "string"], // the order here is not important
  };

  expect(schema).toEqual(expectedValue);
});

test("Array of strings", () => {
  const input = ["abc", "def"];
  const schema = getSchemaFromValue(input, "result");

  const expectedValue = {
    key: "result",
    type: ValueTypeEnum.LIST,
    listItemType: ValueTypeEnum.STRING,
    attributes: {},
    attributeIds: [],
  };

  expect(schema).toEqual(expectedValue);
});

test("Array of objects", () => {
  const input = [
    { number: 34, string: "abc" },
    { number: 0, string: "def" },
  ];
  const schema = getSchemaFromValue(input, "result");

  const expectedValue = {
    key: "result",
    type: ValueTypeEnum.LIST,
    listItemType: ValueTypeEnum.OBJECT,
    attributes: {
      number: {
        key: "number",
        type: ValueTypeEnum.NUMBER,
        listItemType: undefined,
        attributes: {},
        attributeIds: [],
      },
      string: {
        key: "string",
        type: ValueTypeEnum.STRING,
        listItemType: undefined,
        attributes: {},
        attributeIds: [],
      },
    },
    attributeIds: ["number", "string"], // the order here is not important
  };

  expect(schema).toEqual(expectedValue);
});

test("Nested objects", () => {
  const input = {
    array: [
      {
        string: "abc",
        number: 0,
        boolean: false,
        array: ["def", "ghi"],
        object: {
          string: "propertyOne",
        },
      },
      {
        string: "jkl",
        number: 1,
        boolean: true,
        array: ["mno", "pqr"],
        object: {
          string: "propertyTwo",
        },
      },
    ],
    object: {
      number: 3,
    },
  };

  const schema = getSchemaFromValue(input, "result");

  const expectedValue = {
    key: "result",
    type: ValueTypeEnum.OBJECT,
    listItemType: undefined,
    attributes: {
      array: {
        key: "array",
        type: ValueTypeEnum.LIST,
        listItemType: ValueTypeEnum.OBJECT,
        attributes: {
          string: {
            key: "string",
            type: ValueTypeEnum.STRING,
            listItemType: undefined,
            attributes: {},
            attributeIds: [],
          },
          number: {
            key: "number",
            type: ValueTypeEnum.NUMBER,
            listItemType: undefined,
            attributes: {},
            attributeIds: [],
          },
          boolean: {
            key: "boolean",
            type: ValueTypeEnum.BOOLEAN,
            listItemType: undefined,
            attributes: {},
            attributeIds: [],
          },
          array: {
            key: "array",
            type: ValueTypeEnum.LIST,
            listItemType: ValueTypeEnum.STRING,
            attributes: {},
            attributeIds: [],
          },
          object: {
            key: "object",
            type: ValueTypeEnum.OBJECT,
            listItemType: undefined,
            attributes: {
              string: {
                key: "string",
                type: ValueTypeEnum.STRING,
                listItemType: undefined,
                attributes: {},
                attributeIds: [],
              },
            },
            attributeIds: ["string"],
          },
        },
        attributeIds: ["string", "number", "boolean", "array", "object"],
      },
      object: {
        key: "object",
        type: ValueTypeEnum.OBJECT,
        listItemType: undefined,
        attributes: {
          number: {
            key: "number",
            type: ValueTypeEnum.NUMBER,
            listItemType: undefined,
            attributes: {},
            attributeIds: [],
          },
        },
        attributeIds: ["number"],
      },
    },
    attributeIds: ["array", "object"],
  };

  expect(schema).toEqual(expectedValue);
});

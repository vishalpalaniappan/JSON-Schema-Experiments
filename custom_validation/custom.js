
const Ajv = require("ajv/dist/2020");
const ajv = new Ajv();
const schema = require("./test.schema.json");
const data = require("./data.json");

ajv.addKeyword({
    keyword: "isUpperCase",
    validate: function(schema, data, parentData, parentDataProperty, rootData) {
        return data === data.toUpperCase();
    }
});

const validate = ajv.compile(schema);

const isValid = validate(data);

if (isValid) {
    console.log("Is valid");
} else {
    console.log(validate.errors);
}


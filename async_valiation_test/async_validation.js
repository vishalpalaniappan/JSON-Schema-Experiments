import Ajv from "ajv/dist/2020.js";
import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ajv = new Ajv({allErrors: true});

const validationErrors = [];

ajv.addKeyword({
    keyword: "isUpperCase",
    async: true,
    type: "string",
    validate: function(schema, data, parentData, parentDataProperty, rootData) {
        if (data === data.toUpperCase()) {
            return true;
        } else {
            throw new Ajv.ValidationError([
                {
                    keyword: "isUpperCase",
                    message: "String is not upper case.",
                    params: {}
                }
            ]);
        }
    }
});


// This tests custom async validation using the AJV library
// Need to add $async to the schema
// Keyword needs to be added and the validation needs to be awaited.

const validateData = async () => {
    const testSchemaPath = path.join(__dirname, "test.schema.json");
    const testSchema = JSON.parse(await fs.readFile(testSchemaPath, "utf8"));
    const validate = await ajv.compile(testSchema);

    try {
        await validate({
            "testKey": "ASsF",
            "nestedSample": {
                "sample": "a"
            }
        });
    } catch (err) {
        if (err instanceof Ajv.ValidationError) {
            validationErrors.push(err.errors);
        } else {
            throw err;
        }
    }
    
    if (validationErrors.length > 0) {
        console.log("");
        console.log("Custom Validation Report:");
        console.log(validationErrors);
    }
}

validateData();
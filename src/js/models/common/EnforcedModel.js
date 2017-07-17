/**
 * EnforcedModel.js
 * Created by Kevin Li 7/7/17
 * This provides functions that can be used to only allow Immutable Record objects to be created
 * with pre-defined properties. It can optionally parse inbound data into the correct data type
 * before assigining it to a property.
 */

import { Record } from 'immutable';

const remapKeys = (apiMapping, data) => {
    const remapped = {};
    Object.keys(data).forEach((key) => {
        // check if the key should be remapped
        if ({}.hasOwnProperty.call(apiMapping, key)) {
            const modelKey = apiMapping[key];
            remapped[modelKey] = data[key];
        }
        else {
            // not specified in remapping, so use the provided key
            remapped[key] = data[key];
        }
    });

    return remapped;
};

const formatData = (schema = {}, data, formatFuncs = {}) => {
    const values = {};
    if (!data) {
        // no data was provided
        return {};
    }

    // only keep the properties specified in our model definition
    for (const modelProp in schema) {
        // check if the value exists in the inbound API data
        if (!{}.hasOwnProperty.call(data, modelProp)) {
            // doesn't exist, go to next property
            continue;
        }

        if (!data[modelProp]) {
            // the property has a null or undefined value in the inbound API data,
            // set the model value to null
            values[modelProp] = null;

            // however, if the property was expected to be another model, create an empty
            // instance of that model
            if (schema[modelProp] instanceof Record) {
                values[modelProp] = schema[modelProp];
            }

            continue;
        }

        // check if the value needs to be parsed before adding
        if ({}.hasOwnProperty.call(formatFuncs, modelProp)) {
            // it needs to be parsed
            const parseFunc = formatFuncs[modelProp];
            values[modelProp] = parseFunc(data[modelProp]);
        }
        else {
            // it can be added as-is
            values[modelProp] = data[modelProp];
        }
    }

    return values;
};

export default class EnforcedModel {
    constructor(schema, data = {}, formatFuncs = {}, apiMapping = {}) {
        // create a new Record model class using the provided schema and class name
        const ClassType = Record(schema, this.constructor.name);

        if (Object.keys(data).length > 0) {
            // there is data to populate the model with
            let inbound = data;
            if (Object.keys(apiMapping).length > 0) {
                // remap API keys to the model's internal properties as necessary (other keys will
                // remain the same)
                inbound = remapKeys(apiMapping, data);
            }

            const values = formatData(schema, inbound, formatFuncs);
            return new ClassType(values);
        }

        // otherwise create an instance of the model using default values
        return new ClassType({});
    }
}


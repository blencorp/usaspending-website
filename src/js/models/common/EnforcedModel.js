/**
 * EnforcedModel.js
 * Created by Kevin Li 7/7/17
 * This provides functions that can be used to only allow Immutable Record objects to be created
 * with pre-defined properties. It can optionally parse inbound data into the correct data type
 * before assigining it to a property.
 */

import { Record } from 'immutable';

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
    constructor(schema, data = {}, formatFuncs = {}) {
        const ClassType = Record(schema, this.constructor.name);
        if (Object.keys(data).length > 0) {
            const values = formatData(schema, data, formatFuncs);
            return new ClassType(values);
        }

        return new ClassType({});
    }
}


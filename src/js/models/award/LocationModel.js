/**
 * LocationModel.js
 * Created by Kevin Li 7/7/17
 */

import EnforcedModel from 'models/common/EnforcedModel';

const defaultValues = {
    location_id: 0,
    country_code: '',
    country_name: '',
    state_code: '',
    state_name: '',
    state_description: '',
    city_name: '',
    city_code: '',
    congressional_code: '',
    county_name: '',
    county_code: '',
    address_line1: '',
    address_line2: '',
    address_line3: '',
    zip: '',
    foreign_location_description: '',
    performance_code: '',
    foreign_province: '',
    foreign_city_name: '',
    place_of_performance_flag: false,
    recipient_flag: true
};

const calculatedFields = (data = {}) => {
    const values = Object.assign({}, data);
    // ZIP code is either zip5, zip4 substringed to 5, or foreign postal code
    let zip = '';
    if (data.zip5) {
        zip = data.zip5;
    }
    else if (data.zip4) {
        zip = data.zip4.slice(0, 5);
    }
    else if (data.foreign_postal_code) {
        zip = data.foreign_postal_code;
    }
    values.zip = zip;

    return values;
};

const apiMapping = {
    location_country_code: 'country_code'
};

export default class LocationModel extends EnforcedModel {
    constructor(data) {
        // prepare calculated fields
        const values = calculatedFields(data);

        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, values, {}, apiMapping);
    }
}


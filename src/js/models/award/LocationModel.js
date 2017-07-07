/**
 * LocationModel.js
 * Created by Kevin Li 7/7/17
 */

import EnforcedModel from 'models/common/EnforcedModel';

const defaultValues = {
    location_id: 0,
    country_name: '',
    state_code: '',
    state_name: '',
    state_description: '',
    city_name: '',
    city_code: '',
    county_name: '',
    county_code: '',
    address_line1: '',
    address_line2: '',
    address_line3: '',
    foreign_location_description: '',
    zip4: '',
    zip_4a: '',
    congressional_code: '',
    performance_code: '',
    zip_last4: '',
    zip5: '',
    foreign_postal_code: '',
    foreign_province: '',
    foreign_city_name: '',
    place_of_performance_flag: false,
    recipient_flag: true,
    location_country_code: ''
};

export default class LocationModel extends EnforcedModel {
    constructor(data) {
        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, data);
    }
}


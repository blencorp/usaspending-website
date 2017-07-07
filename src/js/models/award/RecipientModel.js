/**
 * RecipientModel.js
 * Created by Kevin Li 7/7/17
 */

import EnforcedModel from 'models/common/EnforcedModel';

import LocationModel from './LocationModel';

const defaultValues = {
    legal_entity_id: 0,
    parent_recipient_unique_id: '',
    recipient_name: '',
    recipient_unique_id: '',
    business_types: '',
    business_types_description: 'Unknown Types',
    business_categories: [],
    limited_liability_corporation: '',
    location: new LocationModel()
};

const formatFuncs = {
    location: (raw) => new LocationModel(raw)
};

export default class RecipientModel extends EnforcedModel {
    constructor(data) {
        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, data, formatFuncs);
    }
}


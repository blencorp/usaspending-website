/**
 * CFDAModel.js
 * Created by Kevin Li 7/18/17
 */

import EnforcedModel from 'models/common/EnforcedModel';

const defaultValues = {
    program_number: '',
    program_title: '',
    popular_name: '',
    federal_agency: '',
    objectives: ''
};

export default class CFDAModel extends EnforcedModel {
    constructor(data) {
        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, data);
    }
}


/**
 * AgencyModel.js
 * Created by Kevin Li 7/7/17
 */

import { Record } from 'immutable';
import EnforcedModel from 'models/common/EnforcedModel';

const toptierDefault = {
    toptier_agency_id: 0,
    cgac_code: '',
    fpds_code: '',
    abbreviation: '',
    name: ''
};

const subtierDefault = {
    subtier_agency_id: 0,
    subtier_code: '',
    abbreviation: '',
    name: ''
};

const ToptierModel = Record(toptierDefault, 'ToptierModel');
const SubtierModel = Record(subtierDefault, 'SubtierModel');

const defaultValues = {
    id: 0,
    toptier_flag: false,
    toptier_agency: new ToptierModel(),
    subtier_agency: new SubtierModel(),
    office: {
        name: ''
    }
};

const formatFuncs = {
    toptier_agency: (raw) => new ToptierModel(raw),
    subtier_agency: (raw) => new SubtierModel(raw)
};

export default class AgencyModel extends EnforcedModel {
    constructor(data) {
        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, data, formatFuncs);
    }
}


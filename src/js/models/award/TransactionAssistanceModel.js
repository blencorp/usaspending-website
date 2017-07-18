/**
 * TransactionAssistanceModel.js
 * Created by Kevin Li 7/18/17
 */

import EnforcedModel from 'models/common/EnforcedModel';

import CFDAModel from './CFDAModel';

const defaultValues = {
    transaction: 0,
    fain: '',
    uri: '',
    total_funding_amount: 0,
    cfda: new CFDAModel()
};

const formatFuncs = {
    cfda: (raw) => new CFDAModel(raw)
};

export default class TransactionAssistanceModel extends EnforcedModel {
    constructor(data) {
        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, data, formatFuncs);
    }
}


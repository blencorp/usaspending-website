/**
 * SingleAwardModel.js
 * Created by Kevin Li 7/7/17
 */

import EnforcedModel from 'models/common/EnforcedModel';

import moment from 'moment';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';

import RecipientModel from './RecipientModel';
import AgencyModel from './AgencyModel';
import LocationModel from './LocationModel';
import TransactionModel from './TransactionModel';


const defaultValues = {
    id: 0,
    award_id: '',
    internal_general_type: 'unknown',
    type: '',
    type_description: '',
    category: '',
    piid: '',
    fain: '',
    uri: '',
    total_obligation: 0,
    total_outlay: 0,
    date_signed: '',
    description: '',
    period_of_performance_start_date: '',
    period_of_performance_current_end_date: '',
    potential_total_value_of_award: '',
    total_subaward_amount: '',
    subaward_count: 0,
    awarding_agency: new AgencyModel(),
    funding_agency: new AgencyModel(),
    recipient: new RecipientModel(),
    place_of_performance: new LocationModel(),
    latest_transaction: new TransactionModel()
};

const formatFuncs = {
    date_signed: (raw) => moment(raw, 'YYYY-MM-DD').format('M/D/YYYY'),
    period_of_performance_start_date: (raw) => moment(raw, 'YYYY-MM-DD').format('M/D/YYYY'),
    period_of_performance_current_end_date: (raw) => moment(raw, 'YYYY-MM-DD').format('M/D/YYYY'),
    potential_total_value_of_award: (raw) => MoneyFormatter.formatMoney(raw),
    total_subaward_amount: (raw) => MoneyFormatter.formatMoney(raw),
    awarding_agency: (raw) => new AgencyModel(raw),
    funding_agency: (raw) => new AgencyModel(raw),
    recipient: (raw) => new RecipientModel(raw),
    place_of_performance: (raw) => new LocationModel(raw),
    latest_transaction: (raw) => new TransactionModel(raw)
};

const apiMapping = {
    
};

const calculatedFields = (data) => {
    const values = Object.assign({}, data);
    // award_id is precalculated based on FAIN, PIID, or URI (in that order)
    let awardId = '';
    if (data.fain) {
        awardId = data.fain;
    }
    else if (data.piid) {
        awardId = data.piid;
    }
    else if (data.uri) {
        awardId = data.uri;
    }
    values.award_id = awardId;

    // internal general type indicates which award UI to display
    if (data.type) {
        values.internal_general_type = SummaryPageHelper.awardType(data.type);
    }

    return values;
};

export default class SingleAwardModel extends EnforcedModel {
    constructor(data) {
        // prepare calculated fields
        const values = calculatedFields(data);

        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, values, formatFuncs, apiMapping);
    }
}


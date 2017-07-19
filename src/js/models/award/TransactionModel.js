/**
 * TransactionModel.js
 * Created by Kevin Li 7/7/17
 */

import EnforcedModel from 'models/common/EnforcedModel';

import AgencyModel from './AgencyModel';
import RecipientModel from './RecipientModel';
import LocationModel from './LocationModel';

import TransactionContractModel from './TransactionContractModel';
import TransactionAssistanceModel from './TransactionAssistanceModel';

const defaultValues = {
    id: 0,
    type: '',
    type_description: '',
    period_of_performance_start_date: '',
    period_of_performance_current_end_date: '',
    action_date: '',
    action_type: '',
    action_type_description: '',
    federal_action_obligation: 0,
    modification_number: '',
    description: '',
    last_modified_date: '',
    certified_date: '',
    fiscal_year: 0,
    award: 0,
    submission: 0,
    awarding_agency: new AgencyModel(),
    funding_agency: new AgencyModel(),
    recipient: new RecipientModel(),
    place_of_performance: new LocationModel(),
    assistance_data: new TransactionAssistanceModel(),
    contract_data: new TransactionContractModel()
};

const formatFuncs = {
    federal_action_obligation: (raw) => parseFloat(raw),
    awarding_agency: (raw) => new AgencyModel(raw),
    funding_agency: (raw) => new AgencyModel(raw),
    recipient: (raw) => new RecipientModel(raw),
    location: (raw) => new LocationModel(raw),
    assistance_data: (raw) => new TransactionAssistanceModel(raw),
    contract_data: (raw) => new TransactionContractModel(raw)
};

export default class TransactionModel extends EnforcedModel {
    constructor(data) {
        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, data, formatFuncs);
    }
}


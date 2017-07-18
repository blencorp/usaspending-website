/**
 * TransactionModel.js
 * Created by Kevin Li 7/7/17
 */

import EnforcedModel from 'models/common/EnforcedModel';

import AgencyModel from './AgencyModel';
import RecipientModel from './RecipientModel';
import LocationModel from './LocationModel';

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
    assistance_data: new TransactionAssistanceModel()
    // contract_data: {
    //     transaction: 2693,
    //     data_source: "DBR",
    //     piid: "DOLJ121A21848",
    //     parent_award_id: null,
    //     cost_or_pricing_data: "Y",
    //     cost_or_pricing_data_description: "Yes",
    //     type_of_contract_pricing: "U",
    //     type_of_contract_pricing_description: "Cost Plus Fixed Fee",
    //     naics: "541310",
    //     naics_description: "ARCHITECTURAL SERVICES",
    //     period_of_performance_potential_end_date: "2018-01-15",
    //     ordering_period_end_date: null,
    //     current_total_value_award: "10500000.00",
    //     potential_total_value_of_award: "10500000.00",
    //     referenced_idv_agency_identifier: null,
    //     idv_type: "D",
    //     idv_type_description: "Basic Ordering Agreement (BOA)",
    //     multiple_or_single_award_idv: null,
    //     multiple_or_single_award_idv_description: null,
    //     type_of_idc: null,
    //     type_of_idc_description: null,
    //     a76_fair_act_action: null,
    //     dod_claimant_program_code: null,
    //     clinger_cohen_act_planning: "0",
    //     commercial_item_acquisition_procedures: "D",
    //     commercial_item_acquisition_procedures_description: "Commercial Item - Procedure Not Used",
    //     commercial_item_test_program: "0",
    //     consolidated_contract: "0",
    //     contingency_humanitarian_or_peacekeeping_operation: null,
    //     contingency_humanitarian_or_peacekeeping_operation_description: null,
    //     contract_bundling: "D",
    //     contract_bundling_description: "Not a Bundled Requirement",
    //     contract_financing: "F",
    //     contract_financing_description: "Performance-Based Financing",
    //     contracting_officers_determination_of_business_size: "O",
    //     cost_accounting_standards: "X",
    //     cost_accounting_standards_description: "Not Applicable",
    //     country_of_product_or_service_origin: "USA",
    //     davis_bacon_act: "X",
    //     davis_bacon_act_description: "Not Applicable",
    //     evaluated_preference: "NONE",
    //     evaluated_preference_description: "No Preference Used",
    //     extent_competed: "A",
    //     extent_competed_description: "Full and Open Competition",
    //     fed_biz_opps: "X",
    //     fed_biz_opps_description: "Not Applicable",
    //     foreign_funding: "X",
    //     foreign_funding_description: "Not Applicable",
    //     gfe_gfp: null,
    //     information_technology_commercial_item_category: null,
    //     information_technology_commercial_item_category_description: null,
    //     interagency_contracting_authority: "X",
    //     interagency_contracting_authority_description: "Not Applicable",
    //     local_area_set_aside: "0",
    //     major_program: null,
    //     purchase_card_as_payment_method: "0",
    //     multi_year_contract: "0",
    //     national_interest_action: "NONE",
    //     national_interest_action_description: "None",
    //     number_of_actions: "1",
    //     number_of_offers_received: "1",
    //     other_statutory_authority: null,
    //     performance_based_service_acquisition: "N",
    //     performance_based_service_acquisition_description: "No",
    //     place_of_manufacture: "C",
    //     place_of_manufacture_description: "Not a manufactured end product",
    //     price_evaluation_adjustment_preference_percent_difference: "0.00",
    //     product_or_service_code: "C214",
    //     program_acronym: null,
    //     other_than_full_and_open_competition: null,
    //     recovered_materials_sustainability: "C",
    //     recovered_materials_sustainability_description: "No Clauses Included and No Sustainability Included",
    //     research: null,
    //     research_description: null,
    //     sea_transportation: null,
    //     sea_transportation_description: null,
    //     service_contract_act: "N",
    //     service_contract_act_description: "No",
    //     small_business_competitiveness_demonstration_program: null,
    //     solicitation_identifier: "DOL111RP20406",
    //     solicitation_procedures: "AE",
    //     solicitation_procedures_description: "Architect-Engineer FAR 6.102",
    //     fair_opportunity_limited_sources: null,
    //     fair_opportunity_limited_sources_description: null,
    //     subcontracting_plan: "C",
    //     subcontracting_plan_description: "Plan Required - Incentive Not Included",
    //     program_system_or_equipment_code: null,
    //     type_set_aside: "NONE",
    //     type_set_aside_description: "No Set Aside Used",
    //     epa_designated_product: "E",
    //     epa_designated_product_description: "Not Required",
    //     walsh_healey_act: "X",
    //     transaction_number: "0",
    //     referenced_idv_modification_number: null,
    //     rec_flag: null,
    //     drv_parent_award_awarding_agency_code: null,
    //     drv_current_aggregated_total_value_of_award: null,
    //     drv_current_total_value_of_award: null,
    //     drv_potential_award_idv_amount_total_estimate: null,
    //     drv_potential_aggregated_award_idv_amount_total_estimate: null,
    //     drv_potential_aggregated_total_value_of_award: null,
    //     drv_potential_total_value_of_award: null,
    //     create_date: "2017-05-23T15:43:23.049452Z",
    //     update_date: "2017-05-23T15:43:23.049472Z",
    //     last_modified_date: null,
    //     certified_date: null,
    //     reporting_period_start: "2017-01-01",
    //     reporting_period_end: "2017-03-31",
    //     submission: 4
    // },
    // assistance_data: null
};

const formatFuncs = {
    federal_action_obligation: (raw) => parseFloat(raw),
    awarding_agency: (raw) => new AgencyModel(raw),
    funding_agency: (raw) => new AgencyModel(raw),
    recipient: (raw) => new RecipientModel(raw),
    location: (raw) => new LocationModel(raw),
    assistance_data: (raw) => new TransactionAssistanceModel(raw)
};

export default class TransactionModel extends EnforcedModel {
    constructor(data) {
        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(defaultValues, data, formatFuncs);
    }
}


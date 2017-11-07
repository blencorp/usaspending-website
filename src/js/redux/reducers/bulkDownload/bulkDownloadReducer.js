/**
 * bulkDownloadReducer.js
 * Created by Lizzie Salita 10/31/17
 **/

export const initialState = {
    dataType: 'awards',
    awards: {
        award_levels: [],
        filters: {
            award_types: [],
            agency: '',
            sub_agency: '',
            date_type: 'action_date',
            date_range: {
                start_date: '',
                end_date: ''
            }
        },
        columns: [],
        file_format: 'csv'
    },
    agencies: [],
    subAgencies: [],
    expectedFile: '',
    pendingDownload: false,
    showCollapsedProgress: false
};

const bulkDownloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA_TYPE': {
            return Object.assign({}, state, {
                dataType: action.dataType
            });
        }
        case 'UPDATE_DOWNLOAD_PARAM': {
            const dataType = Object.assign({}, state[action.dataType], {
                [action.name]: action.value
            });

            return Object.assign({}, state, {
                [action.dataType]: dataType
            });
        }
        case 'UPDATE_DOWNLOAD_FILTER': {
            const filters = Object.assign({}, state[action.dataType].filters, {
                [action.name]: action.value
            });

            const dataType = Object.assign({}, state[action.dataType], {
                filters
            });

            return Object.assign({}, state, {
                [action.dataType]: dataType
            });
        }
        case 'UPDATE_AWARD_DATE_RANGE': {
            const dateRange = Object.assign({}, state.awards.filters.date_range, {
                [action.dateType]: action.date
            });

            const filters = Object.assign({}, state.awards.filters, {
                date_range: dateRange
            });

            const awards = Object.assign({}, state.awards, {
                filters
            });

            return Object.assign({}, state, {
                awards
            });
        }
        case 'CLEAR_DOWNLOAD_FILTERS': {
            const reset = Object.assign({}, initialState[action.dataType]);

            return Object.assign({}, state, {
                [action.dataType]: reset
            });
        }
        case 'SET_AGENCY_LIST': {
            return Object.assign({}, state, {
                agencies: action.agencies
            });
        }
        case 'SET_SUB_AGENCY_LIST': {
            return Object.assign({}, state, {
                subAgencies: action.subAgencies
            });
        }
        case 'SET_DOWNLOAD_EXPECTED_FILE': {
            return Object.assign({}, state, {
                expectedFile: action.file
            });
        }
        case 'SET_DOWNLOAD_PENDING': {
            return Object.assign({}, state, {
                pendingDownload: action.state
            });
        }
        case 'SET_DOWNLOAD_COLLAPSED': {
            return Object.assign({}, state, {
                showCollapsedProgress: action.collapsed
            });
        }
        case 'RESET_DOWNLOAD': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default bulkDownloadReducer;
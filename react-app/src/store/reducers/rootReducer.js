import { 
    IS_LOGGED_IN,
    LOG_IN_STARTED,
    LOG_IN_SECCESS,
    LOG_IN_FAILURE,
    LOG_IN_OPEN,
    LOG_IN_CLOSE,
    LOG_OUT,
    OPEN_MODAL,
    CLOSE_MODAL,
    UPDATE_USER,
    DELETE_USER,
    GET_COMPANIES,
    SET_EDIT_COMPANY,
    CHANGE_INPUT,
    SET_FIELDS,
    UPDATE_COMPANY,
    COMPANY_SUCCESSFULLY_CREATED,
    SKIP_ITEMS
} from '../actions/actions'
import initialState from '../initialState'

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case IS_LOGGED_IN: return {...state, loggedIn: state.loggedIn};
        
        case LOG_IN_STARTED: return {...state, logInStarted: true}
        case LOG_IN_SECCESS: return {...state, loggedIn: true, logInStarted: false, logInForm: false, emailValue: '', passwordValue: '', user: action.payload};
        case LOG_IN_FAILURE: return {...state, loggedIn: false, logInStarted: false, error: action.payload};

        case CHANGE_INPUT: return {...state, [action.payload.input]: action.payload.value}

        case LOG_IN_OPEN: return {...state, logInForm: true};
        case LOG_IN_CLOSE: return {...state, logInForm: false, emailValue: '', passwordValue: ''};

        case LOG_OUT: return {...state, loggedIn: false, user: '', companies: ''};

        case OPEN_MODAL: return {...state, modal: true, modalText: action.payload};
        case CLOSE_MODAL: return {...state, modal: false};

        case UPDATE_USER: return {...state, user: action.payload};
        case DELETE_USER: return {...state, user: '', companies: ''};

        case GET_COMPANIES: return {...state, companies: action.payload.companies, skipped: action.payload.skip, took: action.payload.take};
        case SET_EDIT_COMPANY: return {...state, currentCompany: action.payload};

        case SET_FIELDS: return {...state, isFieldsSet: action.payload};

        case UPDATE_COMPANY: return {...state, currentCompany: action.payload};
        case COMPANY_SUCCESSFULLY_CREATED: return {...state, currentCompany: action.payload}

        case SKIP_ITEMS: return {...state, skipped: action.payload.skip, took: action.payload.take}

        default: return state;
    }
}

export default rootReducer;
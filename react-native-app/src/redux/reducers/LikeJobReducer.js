import _ from 'lodash';
import {
    LIKE_JOB,
    JOB_UNIQUE_KEY,
    DELETE_LIKED_JOB,
    CLEAR_ALL_LIKED_JOBS
} from '../../constants';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIKE_JOB:
            return _.uniqBy([ ...state, action.payload ], JOB_UNIQUE_KEY);
        case DELETE_LIKED_JOB:
            const _state = [ ...state];
            _.remove(_state, function(job) {
                return job[JOB_UNIQUE_KEY] === action.payload[JOB_UNIQUE_KEY];
            });
            return _state;
        case CLEAR_ALL_LIKED_JOBS:
            return INITIAL_STATE;
        default:
            return state;
    }
}

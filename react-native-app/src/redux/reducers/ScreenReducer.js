import {
    STARTING_SCREEN,
    CHANGE_SCREEN
} from '../../constants';

const INITIAL_STATE = STARTING_SCREEN;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_SCREEN:
            return action.payload;
        default:
            return state;
    }
}
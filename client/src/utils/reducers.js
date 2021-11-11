import {
    TAKE_STEP_ACTION,
    SET_USER_DATA
} from "./actions"

const initialState = {
    username: "",
    level: 1,
    experience: 0,
    strength: 0,
    speed: 0,
    endurance: 0,
    health: 0,
    maxHealth: 0,
    gold: 0,
    steps: 0
  };


  const reducer = (state = initialState, action) => {
      switch(action.type) {

          case TAKE_STEP_ACTION:
              return {
                  ...state,
                  steps: state.steps + 1
              };

          case SET_USER_DATA:
              return Object.assign({}, state, action.user)
              
              default:
                  return state;
                };
        }

        export default reducer;
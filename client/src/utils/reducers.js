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
    steps: 0,
    stepMessage: "Click Below to Take a Step!"
  };


  const reducer = (state = initialState, action) => {
      switch(action.type) {

          case TAKE_STEP_ACTION:
              let addedSteps = 1;
              if(action.stepMessage === "You Must Wait to Take A Step!") {
                  addedSteps = 0;
              }
              return {
                  ...state,
                  steps: state.steps + addedSteps,
                  gold: action.gold,
                  level: action.level,
                  levelPoints: action.levelPoints,
                  nextLevel: action.nextLevel,
                  experience: action.experience,
                  stepMessage: action.stepMessage
              };

          case SET_USER_DATA:
              return Object.assign({}, state, action.user)
              
              default:
                  return state;
                };
        }

        export default reducer;
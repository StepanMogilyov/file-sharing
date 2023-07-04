import { GET_USER, LOGOUT_USER } from "./actionTypes";
import { UserInt } from "./actionCreators";

interface actionInt {
  type: string;
  payload: UserInt;
}

const initialState: UserInt | {} = {};

export default function userReducer(state = initialState, action: actionInt) {
  switch (action.type) {
    case GET_USER: {
      return action.payload;
    }
    case LOGOUT_USER: {
      return {};
    }
    default:
      return state;
  }
}

import { GET_USER, LOGOUT_USER } from "./actionTypes";

export interface UserInt {
  name: string;
  surname: string;
  email: string;
  userId: number;
}

export function getUser(user: UserInt) {
  return { type: GET_USER, payload: user };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}

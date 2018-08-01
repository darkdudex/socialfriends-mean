import {
  actions,
  ActionsType
} from "../actions/login.actions";

export function LoginReducer(state: string, action: actions) {

  switch (action.type) {
    case ActionsType.LOGIN_USER:
      return action.payload;
    case ActionsType.REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
}
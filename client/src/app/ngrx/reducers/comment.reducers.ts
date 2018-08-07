import {
  actions,
  ActionsType
} from "../actions/comment.actions";

export function CommentReducer(state: string, action: actions) {

  switch (action.type) {
    case ActionsType.ADD_COMMENT:
      return { type: action.payload }
    default:
      return state
  }
}
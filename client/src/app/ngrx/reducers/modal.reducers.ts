import {
  actions,
  ActionsType
} from "../actions/modal.actions";

export function ModalReducer(state: string, action: actions) {

  switch (action.type) {
    case ActionsType.MODAL_SHOW:
      return { type: action.payload, modalstate: true }
    case ActionsType.MODAL_HIDE:
      return { modalstate: false }
    default:
      return state
  }
}
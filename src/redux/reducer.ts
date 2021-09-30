import { IResult } from '../interfaces'
import { ActionTypes, SET_RESULTS } from './actions'

interface IState {
  results: IResult[]
}

const initialState: IState = {
  results: [],
}

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload,
      }
    default:
      return state
  }
}

export default reducer

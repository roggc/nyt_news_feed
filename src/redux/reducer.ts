import { IResult } from '../interfaces'
import { ActionTypes, SET_RESULTS, SET_SECTION_INDEX } from './actions'

interface IState {
  results: IResult[]
  sectionIndex: number
}

const initialState: IState = {
  results: [],
  sectionIndex: 0,
}

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload,
      }
    case SET_SECTION_INDEX:
      return {
        ...state,
        sectionIndex: action.payload,
      }
    default:
      return state
  }
}

export default reducer

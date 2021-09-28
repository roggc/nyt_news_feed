import { IResult } from '../components/app'

export const SET_RESULTS = 'SET_RESULTS'

export const setResults = (results: IResult[]) =>
  ({
    type: SET_RESULTS,
    payload: results,
  } as const)

export type ActionTypes = ReturnType<typeof setResults>

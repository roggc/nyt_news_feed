import { IResult } from '../interfaces'
export const GET_DATA = 'SAVE_DATA'
export const GET_DATA_COMMIT = 'GET_DATA_COMMIT'
export const SAVE_DATA_ROLLBACK = 'SAVE_DATA_ROLLBACK'
export const SET_RESULTS = 'SET_RESULTS'

export const setResults = (results: IResult[]) =>
  ({
    type: SET_RESULTS,
    payload: results,
  } as const)

export type ActionTypes = ReturnType<typeof setResults>

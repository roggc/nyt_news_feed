import { IResult } from '../interfaces'
export const SET_RESULTS = 'SET_RESULTS'
export const SET_SECTION_INDEX = 'SET_SECTION_INDEX'

export const setResults = (results: IResult[]) =>
  ({
    type: SET_RESULTS,
    payload: results,
  } as const)

export const setSectionIndex = (sectionIndex: number) =>
  ({
    type: SET_SECTION_INDEX,
    payload: sectionIndex,
  } as const)

export type ActionTypes =
  | ReturnType<typeof setResults>
  | ReturnType<typeof setSectionIndex>

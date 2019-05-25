import { combineReducers } from 'redux'
import { AppState } from './rootState'
import { suratesListActionTypes } from '../../app/surates-list/usecases/suratesList.actions'
import suratesList from '../../app/surates-list/usecases/suratesList.reducers'

export type AppActionsType = suratesListActionTypes

export const RootReducer = combineReducers<AppState>({
  suratesList
})


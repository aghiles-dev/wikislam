import { combineReducers } from 'redux'
import { AppState } from './rootState'
import { suratesListActionTypes } from '../../app/surates-list/usecases/suratesList.actions'
import suratesList from '../../app/surates-list/usecases/suratesList.reducers'
import { surateActionTypes } from '../../app/surate/usecases/surate.actions'
import currentSurate from '../../app/surate/usecases/surate.reducers'

export type AppActionsType = suratesListActionTypes | surateActionTypes

export const RootReducer = combineReducers<AppState>({
  suratesList,
  currentSurate
})


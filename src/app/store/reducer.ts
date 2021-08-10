import { createReducer, on } from "@ngrx/store";
import { guitarTunnings } from "../models/guitarTunnings";
import { EMusicalNotes, GuitarTunning, MusicalScale } from "../models/interfaces";
import { musicalScales } from "../models/musicalScales";
import * as actions from './actions';
import { AppState } from "./state";

export const initialState: AppState = {
    guitarTunning: guitarTunnings[0],
    rootNote: EMusicalNotes.C,
    musicalScale: musicalScales[0],
};

const _mainReducer = createReducer(
    initialState,
    on(actions.changeTunning, (state, {guitarTunning}) => ({ ...state, guitarTunning: guitarTunning })),
    on(actions.changeRootNote, (state, {rootNote}) => ({ ...state, rootNote: rootNote })),
    on(actions.changeMusicalScale, (state, {musicalScale}) => ({ ...state, musicalScale: musicalScale }))
);

export function mainReducer(state, action) {
    return _mainReducer(state, action);
}
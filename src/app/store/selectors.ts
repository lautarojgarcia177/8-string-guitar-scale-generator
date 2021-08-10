import { createSelector } from "@ngrx/store";
import { AppState } from "./state";

export const selectScaleGeneratorParameters = (state) => state.main;
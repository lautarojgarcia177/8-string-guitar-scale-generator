import { EMusicalNotes, GuitarTunning, MusicalScale } from "../models/interfaces";

export interface AppState {
    guitarTunning: GuitarTunning,
    rootNote: EMusicalNotes,
    musicalScale: MusicalScale,
};
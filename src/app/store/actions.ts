import { createAction, props } from '@ngrx/store';
import { EMusicalNotes, GuitarTunning, MusicalScale } from '../models/interfaces';

export const changeTunning = createAction(
    'Change Guitar Tunning',
    props<{guitarTunning: GuitarTunning}>()
);

export const changeRootNote = createAction(
    'Change Root Note',
    props<{rootNote: EMusicalNotes}>()
);

export const changeMusicalScale = createAction(
    'Change Musical Scale',
    props<{musicalScale: MusicalScale}>()
);
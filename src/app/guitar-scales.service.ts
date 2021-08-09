import { Injectable } from '@angular/core';
import * as _ from 'lodash';

export interface GuitarTunning {
  name: string,
  stringsTunnings: EMusicalNotes[]
}

export interface MusicalScale {
  name: string,
  // a whole interval is 2, half interval is 1
  intervals: number[]
}

export enum EMusicalNotes {
  C = 'C',
  Db = 'Db',
  D = 'D',
  Eb = 'Eb',
  E = 'E',
  F = 'F',
  Gb = 'Gb',
  G = 'G',
  Ab = 'Ab',
  A = 'A',
  Bb = 'Bb',
  B = 'B'
}

@Injectable({
  providedIn: 'root'
})
export class GuitarScalesService {

  public readonly musicalNotes: EMusicalNotes[] = [
    EMusicalNotes.C,
    EMusicalNotes.Db,
    EMusicalNotes.D,
    EMusicalNotes.Eb,
    EMusicalNotes.E,
    EMusicalNotes.F,
    EMusicalNotes.Gb,
    EMusicalNotes.G,
    EMusicalNotes.Ab,
    EMusicalNotes.A,
    EMusicalNotes.Bb,
    EMusicalNotes.B
  ];

  public readonly makeMusicalNotesIterator = function* (startingMusicalNote?: EMusicalNotes) {
    let index: number;
    if (!!startingMusicalNote) {
      index = this.musicalNotes.indexOf(this.musicalNotes.find(el => el === startingMusicalNote));
    }
    if (!index) index = 0;
    while (true) {
      if (index === this.musicalNotes.length) index = 0;
      yield this.musicalNotes[index];
      index++;
    }
  }

  public readonly musicalScales: MusicalScale[] = [
    {
      name: 'Major',
      intervals: [2, 2, 1, 2, 2, 2, 1]
    },
    {
      name: 'Minor',
      intervals: [2, 1, 2, 2, 1, 2, 2]
    },
    {
      name: 'Chromatic',
      intervals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
  ];

  public readonly tunnings: GuitarTunning[] = [
    {
      name: 'Standard',
      stringsTunnings: [EMusicalNotes.E, EMusicalNotes.B, EMusicalNotes.G, EMusicalNotes.D, EMusicalNotes.A, EMusicalNotes.E, EMusicalNotes.B, EMusicalNotes.Gb]
    },
    {
      name: 'Drop E',
      stringsTunnings: [EMusicalNotes.E, EMusicalNotes.B, EMusicalNotes.G, EMusicalNotes.D, EMusicalNotes.A, EMusicalNotes.E, EMusicalNotes.B, EMusicalNotes.E]
    }
  ];

  constructor() { }

  calculateFretboardNotes(tunning: GuitarTunning): string[] {
    let guitarFretboardNotes = [];
    // Calculate notes for each string
    for (let i = 0; i < 8; i++) {
      const stringIterator = this.makeMusicalNotesIterator(tunning.stringsTunnings[i]);
      const stringNotes: string[] = [];
      for (let i = 0; i < 12; i++) {
        stringNotes.push(stringIterator.next().value);
      }
      guitarFretboardNotes.push(stringNotes);
    }
    return guitarFretboardNotes;
  }

  calculateMusicalScaleNotes(musicalScale: MusicalScale, rootNote: EMusicalNotes): string[] {
    let scaleNotes = [];
    const musicalNotesIterator = this.makeMusicalNotesIterator(rootNote);
    scaleNotes.push(musicalNotesIterator.next().value);
    for (let interval of musicalScale.intervals) {
      let note: EMusicalNotes;
      switch (interval) {
        case 1:
          note = musicalNotesIterator.next().value;
          break;
        case 2:
          musicalNotesIterator.next();
          note = musicalNotesIterator.next().value;
          break;
      }
      scaleNotes.push(note);
    }
    return scaleNotes;
  }
}

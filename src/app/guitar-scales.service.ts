import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { EMusicalNotes, GuitarTunning, MusicalScale } from './models/interfaces';

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

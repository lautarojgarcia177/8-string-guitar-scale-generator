import { Injectable } from '@angular/core';

export interface GuitarTunning {
  name: string,
  stringsTunnings: string[]
}

@Injectable({
  providedIn: 'root'
})
export class GuitarScalesService {
  
  public readonly musicalNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  public readonly makeMusicalNotesIterator = function*(startingMusicalNote?: String) {
    let index: number;
    if (!!startingMusicalNote) {
      index = this.musicalNotes.indexOf(this.musicalNotes.find(el => el === startingMusicalNote));
    }
    if (!index) index = 0; 
    while(true) {
      if (index === this.musicalNotes.length) index = 0;
      yield this.musicalNotes[index];
      index++;
    }
  }

  public readonly musicalScales = ['Chromatic', 'Mayor', 'Minor'];
  public readonly tunnings: GuitarTunning[] = [
    {
      name: 'Standard',
      stringsTunnings: ['E', 'B', 'G', 'D', 'A', 'E', 'B', 'F#']
    },
    {
      name: 'Drop E',
      stringsTunnings: ['E', 'B', 'G', 'D', 'A', 'E', 'B', 'E']
    }
  ];

  constructor() { }

  calculateFretboardNotes(tunning: GuitarTunning): string[] {
    let guitarFretboardNotes: string[] = [];
    // Calculate notes for each string
    for(let i = 0; i<8; i++) {
      const stringIterator = this.makeMusicalNotesIterator(tunning.stringsTunnings[i]);
      guitarFretboardNotes.push(stringIterator.next().value);
    }
    return guitarFretboardNotes;
  }

  calculateMusicalScaleNotes(musicalScale?: string): string[] {
    let scaleNotes = [];
    switch(musicalScale) {
      case 'Chromatic': 
        scaleNotes = this.musicalNotes;
        break;
      default:
        scaleNotes = this.musicalNotes;
        break;
    }
    return scaleNotes;
  }
}

export interface GuitarStringsNotes {
  fretboardNotes: string[];
}

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
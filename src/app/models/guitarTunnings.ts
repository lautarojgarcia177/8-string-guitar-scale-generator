import { GuitarTunning, EMusicalNotes } from "./interfaces";

export const guitarTunnings: GuitarTunning[] = [
    {
        name: 'Standard',
        stringsTunnings: [EMusicalNotes.E, EMusicalNotes.B, EMusicalNotes.G, EMusicalNotes.D, EMusicalNotes.A, EMusicalNotes.E, EMusicalNotes.B, EMusicalNotes.Gb]
    },
    {
        name: 'Drop E',
        stringsTunnings: [EMusicalNotes.E, EMusicalNotes.B, EMusicalNotes.G, EMusicalNotes.D, EMusicalNotes.A, EMusicalNotes.E, EMusicalNotes.B, EMusicalNotes.E]
    }
];
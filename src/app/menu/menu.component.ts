import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public musicalNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  public musicalScales = ['Chromatic', 'Mayor', 'Minor'];
  public tunnings = {
    standard: []
  };

  @Output() rootNoteChange = new EventEmitter<string>();
  @Output() scaleChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onRootNoteChange(selectedRootNote: string) {
    this.rootNoteChange.emit(selectedRootNote);
  }

  onScaleChange(selectedScale: string) {
    this.rootNoteChange.emit(selectedScale);
  }

}

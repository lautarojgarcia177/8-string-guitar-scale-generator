import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dia, shapes } from 'jointjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public rootNote: string;
  public scale: string;

  constructor() {

  }

  onRootNoteChange(rootNote: string) {
    this.rootNote = rootNote;
  }

  onScaleChange(scale: string) {
    this.scale = scale;
  }

}

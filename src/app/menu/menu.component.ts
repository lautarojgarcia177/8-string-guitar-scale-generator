import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GuitarScalesService } from '../guitar-scales.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  musicalNotes = this.guitarScalesService.musicalNotes;
  musicalScales = this.guitarScalesService.musicalScales;
  guitarTunnings = this.guitarScalesService.tunnings;

  constructor(private guitarScalesService: GuitarScalesService) { }

  ngOnInit(): void {
  }

  onScaleChange(scale) {

  }

  onTunningChange(tunning) {

  }

  onRootNoteChange(scale) {

  }

}

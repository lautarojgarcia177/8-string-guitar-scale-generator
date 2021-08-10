import { Component, OnInit } from '@angular/core';
import { GuitarScalesService } from '../guitar-scales.service';
import { musicalScales } from '../models/musicalScales';
import { guitarTunnings } from '../models/guitarTunnings';
import { AppState } from '../store/state';
import { Store } from '@ngrx/store';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import { EMusicalNotes, GuitarTunning, MusicalScale } from '../models/interfaces';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  guitarTunnings = guitarTunnings;
  guitarTunning: GuitarTunning;
  musicalNotes = this.guitarScalesService.musicalNotes;
  rootNote: EMusicalNotes;
  musicalScales = musicalScales;
  musicalScale: MusicalScale;

  constructor(private guitarScalesService: GuitarScalesService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectors.selectScaleGeneratorParameters).pipe(first()).subscribe((scaleGeneratorParameters: AppState) => {
      this.guitarTunning = scaleGeneratorParameters.guitarTunning;
      this.rootNote = scaleGeneratorParameters.rootNote;
      this.musicalScale = scaleGeneratorParameters.musicalScale;
    });
  }

  onTunningChange(): void {
    this.store.dispatch(actions.changeTunning({guitarTunning: this.guitarTunning}));
  }

  onMusicalScaleChange(): void {
    this.store.dispatch(actions.changeMusicalScale({musicalScale: this.musicalScale}));
  }

  onRootNoteChange(): void {
    this.store.dispatch(actions.changeRootNote({rootNote: this.rootNote}));
  }

}

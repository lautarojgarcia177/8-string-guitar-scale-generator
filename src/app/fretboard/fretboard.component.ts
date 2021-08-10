import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { dia, shapes } from 'jointjs';
import { GuitarScalesService } from '../guitar-scales.service';
import { EMusicalNotes } from '../models/interfaces';
import { musicalScales } from '../models/musicalScales';
import { guitarTunnings } from '../models/guitarTunnings';
import { AppState } from '../store/state';
import { Store } from '@ngrx/store';
import * as selectors from '../store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss']
})
export class FretboardComponent implements OnInit, AfterViewInit {

  @ViewChild('jointCanvas') jointCanvas: ElementRef;

  private graph: dia.Graph = new dia.Graph;
  private paper: dia.Paper;
  private graphCells__notes: dia.Cell[];

  private fretboardHeight = 325;
  private stringGap = this.fretboardHeight / 9;
  private xFretPositions = [];

  private scaleGeneratorParameters$: Observable<AppState> = this.store.select(selectors.selectScaleGeneratorParameters);
  private scaleGeneratorParameters: AppState;

  constructor(private guitarScalesService: GuitarScalesService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.paper = new dia.Paper({
      el: document.getElementById('joint-canvas'),
      model: this.graph,
      width: '100%',
      height: this.fretboardHeight,
      interactive: false
    });
    this.drawCanvas();
    this.scaleGeneratorParameters$.subscribe(p => {
      this.scaleGeneratorParameters = p;
      this.graph.clear();
      this.drawCanvas();
      this.drawNotes();
    });
  }

  drawCanvas() {
    this.calculateFretPositions();
    this.drawFretboard();
    this.drawStrings();
  }

  onWindowResize(event: any) {
    this.graph.clear();
    this.drawCanvas();
    this.drawNotes();
  }

  private calculateFretPositions() {
    const fretboardWidth = this.jointCanvas.nativeElement.offsetWidth;
    const scaleLength = fretboardWidth * 2;
    let distance = 0;
    for (let i = 0; i < 12; i++) {
      const location = scaleLength - distance;
      const scaling_factor = location / 17.817;
      distance = distance + scaling_factor;
      this.xFretPositions.push(distance);
    }
  }

  private drawNotes() {
    let yPosition = 0;
    const xPositions = [0, ...this.xFretPositions];
    const fretboardNotes = this.guitarScalesService.calculateFretboardNotes(this.scaleGeneratorParameters.guitarTunning);
    const musicalScale = this.guitarScalesService.calculateMusicalScaleNotes(this.scaleGeneratorParameters.musicalScale, this.scaleGeneratorParameters.rootNote);
    this.graph.removeCells(this.graphCells__notes);
    this.graphCells__notes = [];
    for (let guitarString of fretboardNotes) {
      yPosition += this.stringGap;
      for (let i = 0; i < guitarString.length; i++) {
        const noteElement = new shapes.standard.Circle({
          position: {
            x: (xPositions[i] + xPositions[i + 1]) / 2 - 15,
            y: yPosition - 15
          },
          size: {
            height: 30,
            width: 30,
          },
          attrs: {
            body: {
              fill: 'lightblue',
              opacity: musicalScale.includes(guitarString[i]) ? 1 : 0
            },
            label: {
              text: guitarString[i]
            }
          }
        });
        this.graphCells__notes.push(noteElement);
      }
      this.graph.addCells(this.graphCells__notes);
    }
  }

  private drawFretboard() {
    let inlayFrets = [3, 5, 7, 9];
    // draw frets
    for (let i = 0; i < 12; i++) {
      if (i === 0) {
        // draw nut
        const nut = new shapes.standard.Rectangle({
          position: {
            x: this.xFretPositions[i] * 0.8,
            y: 0
          },
          size: {
            height: this.fretboardHeight,
            width: this.xFretPositions[i] * 0.2
          }
        });
        nut.addTo(this.graph);
      }
      const fret = new shapes.standard.Rectangle({
        position: {
          x: this.xFretPositions[i],
          y: 0
        },
        size: {
          height: this.fretboardHeight,
          width: 5
        }, attrs: {
          body: {
            fill: 'white'
          }
        }
      });
      fret.addTo(this.graph);
      if (inlayFrets.includes(i)) {
        // draw inlay in this fret
        const inlay = new shapes.standard.Circle({
          position: {
            x: (this.xFretPositions[i - 1] + this.xFretPositions[i]) / 2 - 10,
            y: this.fretboardHeight / 2 - 10
          },
          size: {
            height: 20,
            width: 20
          },
          attrs: {
            body: {
              fill: 'white'
            }
          }
        });
        inlay.addTo(this.graph);
      }
    }
  }

  private drawStrings() {
    for (let i = 1; i <= 8; i++) {
      const startOfString = new shapes.standard.Circle({
        position: {
          x: 0,
          y: this.stringGap * i
        },
        size: {
          height: 1,
          width: 1
        }
      });
      const endOfString = new shapes.standard.Circle({
        position: {
          x: this.jointCanvas.nativeElement.offsetWidth,
          y: this.stringGap * i
        },
        size: {
          height: 1,
          width: 1
        }
      });
      const string = new shapes.standard.Link();
      string.source(startOfString);
      string.target(endOfString);
      string.attr({
        line: {
          stroke: 'gray',
          strokeWidth: 5,
          strokeDasharray: '4 2',
          targetMarker: {
            'type': 'path',
            'stroke': 'none',
            'fill': '#3498DB',
            'd': ''
          }
        }
      });
      startOfString.addTo(this.graph);
      endOfString.addTo(this.graph);
      string.addTo(this.graph);
    }
  }

}

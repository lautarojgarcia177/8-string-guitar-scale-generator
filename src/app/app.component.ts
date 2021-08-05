import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dia, shapes } from 'jointjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('jointCanvas') jointCanvas: ElementRef;

  private graph: dia.Graph;
  private paper: dia.Paper;

  private eStringNotes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
  private fretboardNotes = [
    this.eStringNotes
  ]

  constructor() {

  }

  ngOnInit() {
    const graph = this.graph = new dia.Graph;
  }

  ngAfterViewInit() {
    const fretboard = this.paper = new dia.Paper({
      el: document.getElementById('joint-canvas'),
      model: this.graph,
      width: '100vw',
      height: '250px',
      interactive: false
    });
    this.drawFrets();
    this.generateScale();
  }

  private generateScale() {
    const CmajorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const eStringMajorScale = this.eStringNotes.filter(note => CmajorScale.includes(note));
    console.log(eStringMajorScale);
    let eStringMajorScaleFretboardNotesElements = [];
    let currentPosition = 0;
    eStringMajorScale.forEach(note => {
      eStringMajorScaleFretboardNotesElements.push(new shapes.standard.Circle({
        position: {
          x: currentPosition + 50,
          y: 180
        },
        size: {
          height: 30,
          width: 30
        },
        attrs: {
          body: {
            fill: 'lightblue'
          },
          label: {
            text: note
          }
        }
      }))
      currentPosition += 100;
    });
    eStringMajorScaleFretboardNotesElements.forEach(el => el.addTo(this.graph));
    eStringMajorScaleFretboardNotesElements.forEach((el, index) => {
      if (index < eStringMajorScaleFretboardNotesElements.length - 1) {
        let stringLink = new shapes.standard.Link();
        stringLink.source(el);
        stringLink.target(eStringMajorScaleFretboardNotesElements[index + 1]);
        stringLink.attr({
          line: {
            targetMarker: {
              'type': 'path',
              'stroke': 'none',
              'fill': '#3498DB',
              'd': ''
            }
          }
        })
        stringLink.addTo(this.graph);
      }
    })
  }

  private drawFrets() {
    const scaleLength = this.jointCanvas.nativeElement.offsetWidth;
    console.log(scaleLength);
    let distance = 0;
    for (let i = 1; i < 24; i++) {
      const location = scaleLength - distance;
      const scaling_factor = location / 17.817;
      distance = distance + scaling_factor;
      console.log('fret', i, 'distance', distance);
      const topOfTheFret = new shapes.standard.Circle({
        position: {
          x: distance,
          y: 1
        },
        size: {
          height: 1,
          width: 1
        }
      });
      const endOfTheFret = new shapes.standard.Circle({
        position: {
          x: distance,
          y: this.jointCanvas.nativeElement.offsetHeight - 1
        },
        size: {
          height: 1,
          width: 1
        }
      });
      const fretLink = new shapes.standard.Link();
      fretLink.source(topOfTheFret);
      fretLink.target(endOfTheFret);
      fretLink.attr({
        line: {
          targetMarker: {
            'type': 'path',
            'stroke': 'none',
            'fill': '#3498DB',
            'd': ''
          }
        }
      })
      topOfTheFret.addTo(this.graph);
      endOfTheFret.addTo(this.graph);
      fretLink.addTo(this.graph);
    }
  }

}

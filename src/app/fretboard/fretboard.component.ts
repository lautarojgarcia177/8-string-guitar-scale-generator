import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dia, shapes } from 'jointjs';

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss']
})
export class FretboardComponent implements OnInit {

  @ViewChild('jointCanvas') jointCanvas: ElementRef;

  private graph: dia.Graph;
  private paper: dia.Paper;


  private notes = ['C', 'C#', 'D', 'D#','E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  private tunnings = {
    standard: []
  };
  // private fifthStringNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#','E', 'F', 'F#', 'G', 'G#'];
  // private sixthStringNotes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];

  private fretboardNotes = [
    // this.fifthStringNotes,
    // this.sixthStringNotes
  ];
  private fretboardHeight = 250;


  constructor() { }

  ngOnInit() {
    const graph = this.graph = new dia.Graph;
  }

  ngAfterViewInit() {
    this.paper = new dia.Paper({
      el: document.getElementById('joint-canvas'),
      model: this.graph,
      width: '100%',
      height: this.fretboardHeight,
      interactive: false
    });
    this.draw();
    // this.generateScale();
  }

  draw() {
    this.drawFretboard();
    this.drawStrings();
  }

  onWindowResize(event: any) {
    this.graph.clear();
    this.draw();
  }

  // private generateScale() {
  //   const CmajorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  //   const eStringMajorScale = this.eStringNotes.filter(note => CmajorScale.includes(note));
  //   console.log(eStringMajorScale);
  //   let eStringMajorScaleFretboardNotesElements = [];
  //   let currentPosition = 0;
  //   eStringMajorScale.forEach(note => {
  //     eStringMajorScaleFretboardNotesElements.push(new shapes.standard.Circle({
  //       position: {
  //         x: currentPosition + 50,
  //         y: 180
  //       },
  //       size: {
  //         height: 30,
  //         width: 30
  //       },
  //       attrs: {
  //         body: {
  //           fill: 'lightblue'
  //         },
  //         label: {
  //           text: note
  //         }
  //       }
  //     }))
  //     currentPosition += 100;
  //   });
  //   eStringMajorScaleFretboardNotesElements.forEach(el => el.addTo(this.graph));
  //   eStringMajorScaleFretboardNotesElements.forEach((el, index) => {
  //     if (index < eStringMajorScaleFretboardNotesElements.length - 1) {
  //       let stringLink = new shapes.standard.Link();
  //       stringLink.source(el);
  //       stringLink.target(eStringMajorScaleFretboardNotesElements[index + 1]);
  //       stringLink.attr({
  //         line: {
  //           targetMarker: {
  //             'type': 'path',
  //             'stroke': 'none',
  //             'fill': '#3498DB',
  //             'd': ''
  //           }
  //         }
  //       })
  //       stringLink.addTo(this.graph);
  //     }
  //   })
  // }

  private drawFretboard() {
    const fretboardWidth = this.jointCanvas.nativeElement.offsetWidth;
    const scaleLength = fretboardWidth * 2;
    let distance = 0;
    let previousDistance = distance;
    let inlayFrets = [3, 5, 7, 9];
    for (let i = 0; i < 12; i++) {
      const location = scaleLength - distance;
      const scaling_factor = location / 17.817;
      distance = distance + scaling_factor;
      if (i === 0) {
        // draw nut
        const nut = new shapes.standard.Rectangle({
          position: {
            x: distance * 0.7,
            y: 0
          },
          size: {
            height: this.fretboardHeight,
            width: distance * 0.3
          }
        });
        nut.addTo(this.graph);
      }
      const topOfTheFret = new shapes.standard.Circle({
        position: {
          x: distance,
          y: 0
        },
        size: {
          height: 1,
          width: 1
        }
      });
      const endOfTheFret = new shapes.standard.Circle({
        position: {
          x: distance,
          y: this.jointCanvas.nativeElement.offsetHeight
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
      });
      if (inlayFrets.includes(i)) {
        // draw inlay in this fret
          const inlay = new shapes.standard.Circle({
            position: {
              x: (previousDistance + distance) / 2 - 10,
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
      previousDistance = distance;
      topOfTheFret.addTo(this.graph);
      endOfTheFret.addTo(this.graph);
      fretLink.addTo(this.graph);
    }
  }

  private drawStrings() {
    const stringGap = this.fretboardHeight / 9;
    for(let i = 1; i <= 8; i++) {
      const startOfString = new shapes.standard.Circle({
        position: {
          x: 0,
          y: stringGap * i
        },
        size: {
          height: 1,
          width: 1
        }
      });
      const endOfString = new shapes.standard.Circle({
        position: {
          x: this.jointCanvas.nativeElement.offsetWidth,
          y: stringGap * i
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

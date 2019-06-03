import { Component, ViewChild, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';
import * as midiParser from '@tonejs/midi';
import { Midi } from '@tonejs/midi';
import { Track } from '@tonejs/midi/dist/Track';
const MidiRequire = require('@tonejs/midi');
declare var fs: any;


// ADD CHECK OUT OF BOUNDS MIDI VALUE
interface Note {
  fr: string;
  en: string;
  midi: number;
}

interface SubNote {
  origin: Note;
  sub: Note;
  octave: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  @ViewChild('file' , {read: ElementRef , static: false}) file: ElementRef<HTMLDivElement>;
  title = 'aulos';
  parser = midiParser as any;
  midiFile: Midi;
  notes = [
    {fr: 'Do', en: 'C' , midi: 0},
    {fr: 'Do#', en: 'C#' , midi: 1},
    {fr: 'Ré', en: 'D' , midi: 2},
    {fr: 'Ré#', en: 'D#' , midi: 3},
    {fr: 'Mi', en: 'E' , midi: 4},
    {fr: 'Fa', en: 'F' , midi: 5},
    {fr: 'Fa#', en: 'F#' , midi: 6},
    {fr: 'Sol', en: 'G' , midi: 7},
    {fr: 'Sol#', en: 'G#' , midi: 8},
    {fr: 'La', en: 'A' , midi: 9},
    {fr: 'La#', en: 'A#' , midi: 10},
    {fr: 'Si', en: 'B' , midi: 11}
  ];
  octaves = [
    {text: '-1' , value: -1},
    {text: '0' , value: 0},
    {text: '+1' , value: 1}
  ];

  constructor() {
    const midiValue = 0;
    console.log(process.env.HOME);
    console.log(this.getNoteFromMidi(midiValue) , 'octave : ' ,  this.getOctaveFromMidi(midiValue));
    if (localStorage.getItem('midi')) {
      // console.log(this.Midi.deserialize);
      // console.log(this.Midi.);
      // this.midiFile = this.parser
      try {
        const file = fs.readFileSync(localStorage.getItem('midi'));
        this.midiFile = new Midi(file);
        // this.midiFile = JSON.parse(localStorage.getItem('midi'));
        console.log(this.midiFile);
      } catch (error) {
        console.log(error);
      }

    }
  }
  openMidi(midiFile: File) {
    const reader = new FileReader();
    reader.addEventListener('load' , (event: any) => {
      // const m = new MidiRequire(event.target.result);
      // console.log(m);
      // console.log(m.toArray());
      this.midiFile = new this.parser(event.target.result);
      // console.log(event.target.value);
      // localStorage.setItem('midi' , event.target.value);
    });
    reader.readAsArrayBuffer(midiFile);
    // console.log(console.log(midiFile));

    // const midi = new Midi(midiFile);
  }

  logMidiFile() {
    console.log(this.midiFile);
  }

  savePreset() {}

  modifyNotes() {
    console.log('to do modify notes');
  }

/*   private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'text/plain' });
    saveAs(blob, filename);
  } */

  save() {
    const sub = this.getSubstitution();
    this.subAll(sub);
    const data = new Buffer(this.midiFile.toArray());
    const home = process.env.HOME;

    const write = fs.writeFileSync(home + '\\Desktop\\' + this.midiFile.name + '-sub.mid', data);



    // this.saveToFileSystem(data);
   /*  const headers = new Headers();
    headers.append('Accept', 'text/plain');
    // tslint:disable-next-line:object-literal-shorthand
    this.http.get('/api/files', { headers: headers })
      .toPromise()
      .then(response => this.saveToFileSystem(response)); */


/*     const exportLink = document.createElement('a');
    exportLink.setAttribute('href' , 'data:text/csv;base64,' + data);
    exportLink.appendChild(document.createTextNode('sub.midi'));
    this.file.nativeElement.appendChild(exportLink); */


    // const write = fs.writeFileSync('C:\\Users\\laurent\\Desktop\\test.mid', data);

    // const data = new Buffer(this.midiFile..toString();
    // const uriContent = 'data:application/octet-stream,' + encodeURIComponent(data);
    // const newWindow = window.open(uriContent, 'neuesDokument');
    console.log(sub);
    console.log('save it');
  }

  getSubstitution() {
    const substitution = [];
    for (const note of this.notes) {
        const select = document.getElementById(note.midi.toString()) as HTMLSelectElement;
        console.log(select.value);
        const octave = document.getElementById('octave-' + note.midi) as HTMLSelectElement;
        for (const subnote of this.notes) {
            if (subnote.en === select.value) {
                substitution.push({origin: note , sub: subnote , octave: parseInt(octave.value, 10)});
            }
        }
    }
    return substitution;
    }

    // add type
  substituteTrack(track: Track , substitution: SubNote[]) {
    // console.log(track);
    for (const note of track.notes) {
      for (const sub of substitution) {
        if (sub.origin.en === note.pitch) {
          // const midiDiff = sub.origin.midi - sub.sub.midi + sub.octave;
          // console.log(midiDiff);
          // note.midi = note.midi + midiDiff;
          note.pitch = sub.sub.en;
          note.octave = note.octave + sub.octave;
          note.name = note.pitch + note.octave;
          break;
        }
      }
    }
    // console.log(track);
  }

  subAll(substitution: SubNote[]) {
    for (const track of this.midiFile.tracks) {
      this.substituteTrack(track , substitution);
    }
    // do all tracks and save
  }

  getNoteFromMidi(midiNote: number): Note {
    const modulo = midiNote % 12;
    return this.notes[modulo];
  }

  getOctaveFromMidi(midiNote: number): number {
    let octave = -1;
    while (midiNote > 11) {
      midiNote = midiNote - 12;
      octave++;
    }
    return octave;
  }

  requestMidiApi() {
        // TODO take type of requestMidiaccess api
        navigator.requestMIDIAccess()
        .then((access) => {
          console.log(access);

          // Get lists of available MIDI controllers
          const inputs = access.inputs.values();
          const outputs = access.outputs.values();

          access.onstatechange = (e) => {

            // Print information about the (dis)connected MIDI controller
            console.log(e.port.name, e.port.manufacturer, e.port.state);
          };
        });
  }
}

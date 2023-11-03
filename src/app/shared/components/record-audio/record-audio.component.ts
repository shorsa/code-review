import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import WaveSurfer from 'wavesurfer.js';
// declare var MediaRecorder: any;

@Component({
  selector: 'app-record-audio-old',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.scss'],
})
export class RecordAudioComponent implements OnInit, AfterViewInit {
  @ViewChild('wavesurfer', { static: true }) wavesurferEl!: ElementRef;
  @ViewChild('audioWrapper', { static: true }) audioWrapper!: ElementRef;

  mediaRecorder!: MediaRecorder;
  chunks: Blob[] = [];
  audioFiles: any[] = [];
  isRecording: boolean = false;
  isPause: boolean = false;
  createObjectURLs: { id: number; url: string; duration?: string }[] = [];

  wavesurfer: WaveSurfer[] = [];

  constructor(private dom: DomSanitizer, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    (navigator as any).getUserMedia(
      { audio: true },
      (stream: any) => {
        console.log(stream);

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.onstop = (e: any) => {
          console.log('data available after MediaRecorder.stop() called.');

          // var clipName = prompt('Enter a name for your sound clip');

          // var clipContainer = document.createElement('article');
          // var clipLabel = document.createElement('p');
          // var audio = document.createElement('audio');
          // var deleteButton = document.createElement('button');

          // clipContainer.classList.add('clip');
          // audio.setAttribute('controls', '');
          // deleteButton.innerHTML = 'Delete';
          // clipLabel.innerHTML = clipName;

          // clipContainer.appendChild(audio);
          // clipContainer.appendChild(clipLabel);
          // clipContainer.appendChild(deleteButton);
          // soundClips.appendChild(clipContainer);

          // audio.controls = true;
          const blob = new Blob(this.chunks, { type: 'audio/mp3' });
          this.chunks = [];
          const audioURL = URL.createObjectURL(blob);
          this.createObjectURLs.push({ id: this.createObjectURLs.length, url: audioURL });
          console.log(this.dom.bypassSecurityTrustUrl(audioURL));

          // audio.src = audioURL;
          console.log(audioURL);

          this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
          console.log(audioURL);
          console.log('recorder stopped');
          this.changeDetector.detectChanges();
        };
        this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
          this.chunks.push(e.data);
          this.wavesurfer.forEach((item) => item.destroy());
          this.createObjectURLs.forEach((item, index) => {
            this.createAudio(item, index);
          });
          this.changeDetector.detectChanges();
        };
      },
      () => {
        alert('Error capturing audio.');
      }
    );
    this.mediaRecorder;
  }

  createAudio(file: { id: number; url: string; duration?: string }, index: number) {
    let duration;
    const wavesurfer = WaveSurfer.create({
      container: document.getElementById(`report-${file.id}`)!,
      waveColor: '#606F76',
      progressColor: '#D9E5EB',
      url: file.url,
      // Set a bar width
      barWidth: 2,
      // Optionally, specify the spacing between bars
      barGap: 4,
      // And the bar radius
      barRadius: 2,
    });
    // this.createObjectURLs.forEach((file) => {
    this.wavesurfer.push(wavesurfer);
    wavesurfer.on('ready', () => {
      const durationInSeconds = wavesurfer.getDuration();
      const durationInMinutes = Math.floor(durationInSeconds / 60);
      const durationSecondsRemainder = Math.floor(durationInSeconds % 60);
      duration = `${durationInMinutes}:${durationSecondsRemainder}`;
    });

    this.createObjectURLs[index].duration = duration;
    // });
  }

  ngAfterViewInit(): void {
    console.log(this.audioWrapper.nativeElement);
    // this.wavesurfer = WaveSurfer.create({
    //   container: this.audioWrapper.nativeElement,
    //   waveColor: 'rgb(200, 0, 200)',
    //   progressColor: 'rgb(100, 0, 100)',

    //   // Set a bar width
    //   barWidth: 2,
    //   // Optionally, specify the spacing between bars
    //   barGap: 4,
    //   // And the bar radius
    //   barRadius: 2,
    // });
  }

  handlePlay(file: any, index: number) {
    this.wavesurfer[index].play();
  }

  startRecording() {
    this.mediaRecorder.start();
    this.isRecording = true;
    MediaRecorder;
    console.log('recorder state', this.mediaRecorder.state);
    console.log('recorder started');
  }

  pauseRecording() {
    if (this.isPause) return;

    this.isPause = true;
    this.mediaRecorder.pause();
    console.log('recorder state', this.mediaRecorder.state);
  }

  continueRecording() {
    this.mediaRecorder.resume();
    this.isPause = false;
    console.log('recorder state', this.mediaRecorder.state);
  }

  stopRecording() {
    this.isRecording = false;
    this.mediaRecorder.stop();
    console.log('recorder state', this.mediaRecorder.state);
    // createAudio(this.)
    // this.wavesurfer.options.url = this.audioFiles[0];
    // this.createAudio();
  }
}

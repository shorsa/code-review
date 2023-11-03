import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-record-audio',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.scss'],
})
export class RecordAudioComponent implements AfterViewInit {
  @ViewChild('audioControl') audioControl!: ElementRef;

  @Input() isUrgent: boolean = false;
  @Output() isUrgentChange = new EventEmitter<boolean>();

  @Input() isRedFlag: boolean = false;
  @Output() isRedFlagChange = new EventEmitter<boolean>();

  @Input() audioList: Blob[] = [];
  @Output() audioListChange = new EventEmitter<Blob[]>();

  mediaRecorder?: MediaRecorder;
  waveSurfer?: WaveSurfer;
  recordedChunks: any[] = [];
  recordings: { blob: Blob; waveSurfer: WaveSurfer | null; url: string }[] = [];
  isRecording: boolean = false;
  isPause: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // this.initWaveSurfer();
  }

  toggleRecordingPause() {
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.pause();
    } else if (this.mediaRecorder?.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  initWaveSurfer() {
    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
    });
  }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        setTimeout(() => {
          const elementIndex = this.recordings.length;
          this.recordings[elementIndex] = {
            blob: blob,
            waveSurfer: null,
            url: url,
          };

          this.changeDetector.detectChanges();

          const waveSurfer = WaveSurfer.create({
            container: `#waveform${this.recordings.length - 1}`,
            waveColor: '#606F76',
            progressColor: '#D9E5EB',
            url: url,
            barWidth: 2,
            barGap: 4,
            barRadius: 2,
          });

          this.recordings[elementIndex].waveSurfer = waveSurfer;

          waveSurfer.load(url);
          this.changeDetector.detectChanges();
          this.audioListChange.emit(this.recordings.map((item) => item.blob));
        }, 500);

        this.isPause = false;
      };

      this.mediaRecorder.onpause = () => {
        this.isPause = true;
        this.changeDetector.detectChanges();
      };

      this.mediaRecorder.onresume = () => {
        this.isPause = false;
        this.changeDetector.detectChanges();
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.changeDetector.detectChanges();
    });
  }

  blobToAudioBuffer(blob: Blob): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onloadend = () => {
        const audioContext = new ((window as any).AudioContext ||
          (window as any).webkitAudioContext)();
        audioContext.decodeAudioData(reader.result as ArrayBuffer, resolve, reject);
      };
    });
  }

  pauseRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
    } else if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  playRecording(index: number) {
    const recording = this.recordings[index];
    recording.waveSurfer?.play();
  }

  deleteRecording(index: number) {
    this.recordings.splice(index, 1);
    this.audioListChange.emit(this.recordings.map((item) => item.blob));
  }
}

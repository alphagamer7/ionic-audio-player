import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html'
    
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
    @Input() src: string;

    @ViewChild('player') playerElementRef: ElementRef;

    isPlaying = false;
    isLoading = false;
    currentTime: any = 0;
    currentTimeText:any = "0:00"
    durationText:any=""
    duration = 0;

  timerText;

    private _player: HTMLAudioElement;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this._player = this.playerElementRef.nativeElement;
        this._bindPlayerEvents();
    }

    play(): void {
        this._player.paused ? this._player.play() : this._player.pause();
    }

    seek({ detail: { value } }: { detail: { value: number } }): void {
        this._player.currentTime = value;
    }

    private _bindPlayerEvents(): void {
        this._player.addEventListener('playing', () => {
            this.isPlaying = true;
        });

        this._player.addEventListener('pause', () => {
            this.isPlaying = false;
        });

        this._player.addEventListener('timeupdate', () => {
        var mins = Math.floor(this.currentTime / 60);
        var secs: any = Math.floor(this.currentTime% 60);
        if (secs < 10) {
          secs = '0' + String(secs);
        }
       
            this.currentTimeText = mins + ':' + secs;
            this.currentTime = Math.floor(this._player.currentTime);
        });

        this._player.addEventListener('seeking', () => {
            this.isLoading = true;
        });

        this._player.addEventListener('seeked', () => {
            this.isLoading = false;
        });

        this._player.addEventListener('loadstart', () => {
            this.isLoading = true;
        });

        this._player.addEventListener('loadeddata', () => {
            this.isLoading = false;
            this.duration = Math.floor(this._player.duration);
            var mins = Math.floor(this.duration / 60);
            var secs: any = Math.floor(this.duration% 60);
            if (secs < 10) {
              secs = '0' + String(secs);
            }
           
            this.durationText = mins + ':' + secs;
        });
    }

    // updateTime(){

    //     var mins = Math.floor(this.currentTime / 60);
    //     var secs: any = Math.floor(this.currentTime% 60);
    //     if (secs < 10) {
    //       secs = '0' + String(secs);
    //     }
    //     return this.timerText = mins + ':' + secs;
         
    // }
  
}

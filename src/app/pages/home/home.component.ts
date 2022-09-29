import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

declare var particlesJS: any;
declare var data: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public homeData = data['Home'];
  constructor(private _changeDetectorRed: ChangeDetectorRef) {
    _changeDetectorRed.detach();
  }

  ngOnInit(): void {
    particlesJS.load('particles-js');
    this._changeDetectorRed.detectChanges();
  }

  ngAfterViewInit() {
    new Typed('#element', {
      stringsElement: '#typed-strings',
      typeSpeed: 100,
      backDelay: 3000,
      loop: true,
    });
  }
}

import {
  Component,
  OnInit,
  HostListener,
  Inject,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScriptService } from 'src/app/services/script.service';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css'],
})
export class NavMainComponent implements OnInit, AfterViewInit {
  @ViewChild('menu_btn') i!: ElementRef;

  offset: number = 50;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _scriptService: ScriptService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  openMenu() {
    this.document.querySelector('.menu')?.classList.toggle('menu-open');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (scrollY > this.offset) {
      this.document.getElementById('navbar')?.classList.add('navbar-active');
    } else {
      this.document.getElementById('navbar')?.classList.remove('navbar-active');
    }
  }
}

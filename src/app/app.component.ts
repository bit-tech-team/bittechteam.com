import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bit-tech-team';

  ngAfterViewInit(): void {
    let loader = document.getElementById('loader')!!;
    let splash = document.getElementById('splash')!!;
    let rightSection = document.getElementById('section-right')!!;
    let leftSection = document.getElementById('section-left')!!;
    setTimeout(() => {
      splash.remove();
      rightSection.style.transform = 'translateX(100%)';
      leftSection.style.transform = 'translateX(-100%)';
      setTimeout(() => {
        loader.remove();
      }, 800);
    }, 1000);
  }
}

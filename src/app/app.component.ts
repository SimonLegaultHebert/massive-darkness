import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'massive-darkness';

  constructor() {
    // setTimeout(() => {
    //   window.open('https://www.youtube.com/watch?v=FpYNs-EfJjI&t=20986s', '_blank');
    // }, 2000);
  }
}


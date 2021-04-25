import { Component } from '@angular/core';

// decorator
@Component({
  selector: 'app-root', //name of the element
  templateUrl: './app.component.html', //the content of html file
  // styleUrls: ['./app.component.css']
  styles: [`
  h2 {
    color: rgb(18, 97, 224);
  }
  `]
})
export class AppComponent {

}



import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list/shpping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
  title = 'first-project';
  loadedFeature = 'recipes';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}

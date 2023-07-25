import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shopping-and-recipe-angular-project';
  activeFeature = 'Recipe';

  onNavigate(feature: string) {
    this.activeFeature = feature;
  }
}

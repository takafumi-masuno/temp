import { Component } from '@angular/core';
import { StoreAppFacade } from './shared/stores/app';
@Component({
  selector: 'athome-csite-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public storeAppFacade: StoreAppFacade) {}
}

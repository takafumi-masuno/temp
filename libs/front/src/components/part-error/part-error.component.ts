import { Component, Input } from '@angular/core';

@Component({
  selector: 'athome-customhouse-part-error',
  templateUrl: './part-error.component.html',
  styleUrls: ['./part-error.component.scss'],
})
export class PartErrorComponent {
  @Input() errorList: string[];
  @Input() errorBottomList: boolean;
  @Input() errorTopList: boolean;
}

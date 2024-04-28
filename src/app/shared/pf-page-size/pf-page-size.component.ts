import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pf-page-size',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pf-page-size.component.html',
  styleUrl: './pf-page-size.component.css'
})
export class PfPageSizeComponent {
@Output() pageSizeChange =  new EventEmitter<Event>();
pageSizeOptions = [5,10,20];

constructor() {}

  onPageSizeChange(size: Event) {
    this.pageSizeChange.emit(size);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pf-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pf-pagination.component.html',
  styleUrl: './pf-pagination.component.css'
})
export class PfPaginationComponent {
@Input() currentPage: number =1 ;
@Input() totalPages: number =1 ;
@Output() pageChange = new EventEmitter<number>();

changePage(pageNumber: number){
  this.pageChange.emit(pageNumber);
}
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PfPageSizeComponent } from '../pf-page-size/pf-page-size.component';
import { PfPaginationComponent } from '../pf-pagination/pf-pagination.component';
import { PfTooltipComponent } from '../pf-tooltip/pf-tooltip.component';

@Component({
  selector: 'app-pf-table',
  standalone: true,
  imports: [CommonModule, PfPageSizeComponent, PfPaginationComponent, PfTooltipComponent],
  templateUrl: './pf-table.component.html',
  styleUrl: './pf-table.component.css'
})
export class PfTableComponent implements OnInit{
  @Input() fields: any[] = [];
  @Input() items: any[] = [];
  @Output() edit=new EventEmitter<any>();
  pageSize: number = 5;
  currentPage: number = 1;

  ngOnInit():void {
    if(typeof document !== 'undefined'){
      document.addEventListener('click', function () {
        const dropdowns = document.querySelectorAll('.dropdown_menu');
        dropdowns.forEach((dropdown:any) => {
          dropdown.style.display = 'none';
        })
      });
    }

  }

  getPaginatedItems(){
    const startIndex = (this.currentPage-1)*this.pageSize;
    const endIndex =  startIndex + this.pageSize;
    const newItems =  this.items.slice(startIndex, endIndex);
    return newItems;
  }

  onPageSizeChange(newSize: any):void {
    this.pageSize = newSize.target?.value;
    this.currentPage = 1;
  }

  get totalPages():number {
    return Math.ceil(this.items.length/this.pageSize);
  }

  onPageChange (pageNumber: number):void {
    this.currentPage = pageNumber
  }

  editItem(item: any):void{
    this.edit.emit(item)
  }

  toggleDropdown(event: any):void {
    event.stopPropagation();
    const dropdownMenu =  event.target.nextElementSibling;
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none': 'block';
  }

}

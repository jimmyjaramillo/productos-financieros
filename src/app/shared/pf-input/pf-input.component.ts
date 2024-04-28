import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pf-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pf-input.component.html',
  styleUrl: './pf-input.component.css'
})
export class PfInputComponent {
  @Input() inputType: string = 'text';
  @Input() id: string | undefined ;
  @Input() placeholder: string | undefined;
  @Input() required: boolean = false
  @Input() readonly: boolean = false
  @Output() valueChanged=new EventEmitter<string>();

  onInputChange(value: any): void{
    this.valueChanged.emit(value)
  }
}

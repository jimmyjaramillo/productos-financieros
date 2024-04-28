import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pf-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pf-button.component.html',
  styleUrl: './pf-button.component.css'
})
export class PfButtonComponent {
  @Input() label: string | undefined;
  @Input() type: string = 'button';
  @Input() kind: string = 'primary'

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit()
  }

}

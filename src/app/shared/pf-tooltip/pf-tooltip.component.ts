import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pf-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pf-tooltip.component.html',
  styleUrl: './pf-tooltip.component.css'
})
export class PfTooltipComponent {
@Input() message: string | undefined;
visible: boolean= false;
  show():void {
    this.visible = true;
  }

  hide():void {
    this.visible= false;
  }
}

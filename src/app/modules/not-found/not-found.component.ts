import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PfButtonComponent } from "../../shared/pf-button/pf-button.component";

@Component({
    selector: 'app-not-found',
    standalone: true,
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css',
    imports: [PfButtonComponent]
})
export class NotFoundComponent {
  constructor(private router: Router){}

  back(): void {
    this.router.navigate([''])
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfPaginationComponent } from './pf-pagination.component';

describe('PfPaginationComponent', () => {
  let component: PfPaginationComponent;
  let fixture: ComponentFixture<PfPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

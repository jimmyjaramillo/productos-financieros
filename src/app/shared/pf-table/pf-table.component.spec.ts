import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfTableComponent } from './pf-table.component';

describe('PfTableComponent', () => {
  let component: PfTableComponent;
  let fixture: ComponentFixture<PfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

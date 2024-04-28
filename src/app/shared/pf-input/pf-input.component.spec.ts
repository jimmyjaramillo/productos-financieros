import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfInputComponent } from './pf-input.component';

describe('PfInputComponent', () => {
  let component: PfInputComponent;
  let fixture: ComponentFixture<PfInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

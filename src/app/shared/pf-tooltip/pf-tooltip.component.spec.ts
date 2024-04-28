import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfTooltipComponent } from './pf-tooltip.component';

describe('PfTooltipComponent', () => {
  let component: PfTooltipComponent;
  let fixture: ComponentFixture<PfTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

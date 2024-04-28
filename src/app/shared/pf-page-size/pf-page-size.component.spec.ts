import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfPageSizeComponent } from './pf-page-size.component';

describe('PfPageSizeComponent', () => {
  let component: PfPageSizeComponent;
  let fixture: ComponentFixture<PfPageSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfPageSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfPageSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

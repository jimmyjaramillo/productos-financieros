import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  const mockRouter = {
    navigate: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when back() is called', async () => {
    component.back();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

});

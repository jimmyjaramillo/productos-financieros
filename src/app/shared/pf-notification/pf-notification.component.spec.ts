import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { PfNotificationComponent } from './pf-notification.component';

describe('PfNotificationComponent', () => {
  let component: PfNotificationComponent;
  let fixture: ComponentFixture<PfNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfNotificationComponent, CommonModule],
      providers: [NotificationService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

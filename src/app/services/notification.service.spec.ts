import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call a notification successfully', (done) => {
    const message = 'Test success message';
    const type = 'success';
    service.notification$.subscribe((notification) => {
        expect(notification).toEqual({ message, type });
        done();
    });
    service.showNotification(message, type);
});

it('Should clear the notifications', (done) => {
    service.showNotification('Test success message', 'success');
    service.notification$.subscribe((notification) => {
        expect(notification).toBeNull();
        done();
    });
    service.clearNotification();
});
});

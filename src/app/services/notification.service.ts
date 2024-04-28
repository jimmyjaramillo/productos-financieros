import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject =  new BehaviorSubject<any>(null);
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string, type: string):void{
    this.notificationSubject.next({message, type})
  }

  clearNotification():void {
    this.notificationSubject.next(null)
  }

}

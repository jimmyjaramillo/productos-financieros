import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-pf-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pf-notification.component.html',
  styleUrl: './pf-notification.component.css'
})
export class PfNotificationComponent implements OnInit{
  message: string ='';
  type: string = '';
  visible: boolean = false;
  private autoCloseTimeout: any;
  constructor(private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notification => {
      if(notification){
        this.message = notification.message;
        this.type = notification.type;
        this.visible = true;

        this.autoCloseTimeout = setTimeout(() => {
          this.close();
        }, 15000)
      }else{
        this.visible= false;
      }
    })

  }

  close():void {
    this.visible = false;
    clearTimeout(this.autoCloseTimeout);
    this.notificationService.clearNotification();
  }
}

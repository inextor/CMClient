import {

  Component,

  OnInit,

  EventEmitter,

  Output

} from '@angular/core';

import {

  PushNotificationsService

} from '../../services/push.notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [ PushNotificationsService]
})
export class NotificationsComponent implements OnInit {

   title: string = 'Push Notifications!';

  constructor(private _notificationService: PushNotificationsService) {

      this._notificationService.requestPermission();

  }

  ngOnInit() {
  }

  notify() {

    let data: Array < any >= [];

    data.push({

        'title': 'Cita',
        
        'alertContent': 'Alerta de la cita'

    });

    // data.push({

    //     'title': 'Request',

    //     'alertContent': 'This is Second Alert '

    // });

    // data.push({

    //     'title': 'Leave Application',

    //     'alertContent': 'This is Third Alert '

    // });

    // data.push({

    //     'title': 'Approval',

    //     'alertContent': 'This is Fourth Alert '

    // });

    // data.push({

    //     'title': 'To Do Task',

    //     'alertContent': 'This is Fifth Alert '

    // });

    this._notificationService.generateNotification(data);

}

}

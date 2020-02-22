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
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.css']
})
export class PushNotificationsComponent implements OnInit {

  
  title: string = 'Browser Push Notifications!';

  constructor(private _notificationService: PushNotificationsService) {

      this._notificationService.requestPermission();

  }

  ngOnInit() {
  }

  notify() {

    let data: Array < any >= [];

    data.push({

        'title': 'Approval',
        
        'alertContent': 'This is First Alert '

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

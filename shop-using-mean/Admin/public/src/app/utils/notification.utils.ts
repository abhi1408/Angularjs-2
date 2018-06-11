import { Injectable } from '@angular/core';

declare var alertify: any;

@Injectable()
export class NotificationUtils {
    private _notifier: any = alertify;

    constructor() {}

    /*
    Prints message using the alertify.js lib
    */
    printMessage(messageType: string, message: string) {
        switch (messageType) {
            case "success":
                this._notifier.success(message);
            break;
            case "error":
                this._notifier.error(message);
            break;
            
            default:
                // code...
            break;
        }
    }
}

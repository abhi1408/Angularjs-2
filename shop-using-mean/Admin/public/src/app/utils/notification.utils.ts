import { Injectable } from '@angular/core';

declare var alertify: any;

@Injectable()
export class NotificationUtils {
    private _notifier: any = alertify;

    constructor() {}

    /*
    Prints a success message using the alertify.js lib
    */
    printSuccessMessage(message: string) {

        this._notifier.success(message);
    }

    /*
    Prints an error message using the alertify.js lib
    */
    printErrorMessage(message: string) {
        this._notifier.error(message);
    }
}

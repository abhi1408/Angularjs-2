import { Injectable } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';

@Injectable()

export class ConfigUtils {
    
    _apiURI : string;
    _cropperSettings: CropperSettings;

    constructor() {
        this._apiURI = 'http://localhost:8000/api/';
    }

    getApiURI() {
        return this._apiURI;
    }

    getApiHost() {
        return this._apiURI.replace('api/','');
    }

    /*
    * Global Editor configuration setting
    */
    editorGlobalSettings() {
        return { 
            placeholderText: 'Edit Your Content Here!',
            height: 200,
        }
    }

    /*
    * Global Image cropper configuration setting
    */
    imageCropperGlobalSettings() {
        this._cropperSettings = new CropperSettings();
        this._cropperSettings.width = 100;
        this._cropperSettings.height = 100;

        this._cropperSettings.croppedWidth = 500;
        this._cropperSettings.croppedHeight = 500;

        this._cropperSettings.canvasWidth = 430;
        this._cropperSettings.canvasHeight = 300;

        this._cropperSettings.minWidth = 200;
        this._cropperSettings.minHeight = 200;
        
        this._cropperSettings.cropperClass = 'cropper-canvas';

        return this._cropperSettings;
    }
}
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigUtils {
    
    _apiURI : string;

    constructor() {
        this._apiURI = 'http://localhost:8000/api/';
     }

     getApiURI() {
         return this._apiURI;
     }

     getApiHost() {
         return this._apiURI.replace('api/','');
     }
}
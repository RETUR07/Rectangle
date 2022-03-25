import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
export class HttpService {
    constructor(
        private http: HttpClient,
        @Inject('API_URL') public ApiUrl: String
        ) {}
    
    public GetData(urlPart:string) {
        return this.http.get<any>(this.ApiUrl + urlPart);
    }

    public SaveData(urlPart:string, data:any) {
        return this.http.post(this.ApiUrl + urlPart, data);
    }
}
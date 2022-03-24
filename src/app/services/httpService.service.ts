import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }
    
    public GetRectangle() {
        return this.http.get<any>("https://localhost:7043/api/Data");
    }

    public SaveRectangle(rectangle: {x: number, y:number, width: number, height:number}) {
        return this.http.post("https://localhost:7043/api/Data", rectangle);
    }
}
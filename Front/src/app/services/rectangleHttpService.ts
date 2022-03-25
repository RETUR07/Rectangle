import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './httpService.service';
import { Rectangle } from '../models/rectangle.model';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class RectangleHttpService {
    constructor(
        private http: HttpService
        ) {}
    
    public GetRectangle(): Observable<Rectangle> {
       
       return this.http.GetData("/Data").pipe(
           map(data => {
            let rectangle: Rectangle = new Rectangle(); 
            rectangle.rectX1 = +data.x;
            rectangle.rectX2 = +data.x + +data.width;
            rectangle.rectY1 = +data.y;
            rectangle.rectY2 = +data.y + +data.height;
            return rectangle;
           })
       );
    }

    public SaveRectangle(rectangle: Rectangle): Observable<any> {
        return this.http.SaveData("/Data", 
        {
            x: rectangle.getX(),
            y:rectangle.getY(), 
            width: rectangle.getWidth(), 
            height:rectangle.getHeight()
        });
    }
}
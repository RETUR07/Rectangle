import { Component, Output } from '@angular/core';
import { Rectangle } from 'src/app/models/rectangle.model';
import { RectangleHttpService } from 'src/app/services/rectangleHttpService';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.svg',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent {  
  public IsEdited: boolean = false;
  public rectangle: Rectangle = new Rectangle();
  public rectangleCreated = false;

  public xResizeStart: number;
  public yResizeStart: number;

  constructor (private http: RectangleHttpService)
  {
    this.http.GetRectangle().subscribe((rec) =>
      {
        this.rectangle = rec;
        this.rectangleCreated = true;
      }
    );
  }

  onMouseLeave(event: any)
  {
    if(this.IsEdited)
      this.onMouseUp(event);
  }

  onMouseDown(event: any)
  {
    this.IsEdited = true;

    if(!this.rectangleCreated)
    {
      this.rectangle.rectX1 = event.clientX;
      this.rectangle.rectY1 = event.clientY;
      this.rectangle.rectX2 = event.clientX;
      this.rectangle.rectY2 = event.clientY;
    }
    else{
      this.xResizeStart = event.clientX;
      this.yResizeStart = event.clientY;
    }
  }

  onMouseUp(event: any)
  {
    this.rectangleCreated = true;
    this.IsEdited = false;
    this.http.SaveRectangle(this.rectangle).subscribe();
  }

  onMouseMove(event: any)
  {
    if (this.IsEdited)
      if (!this.rectangleCreated){
        this.rectangle.rectX2 = event.clientX;
        this.rectangle.rectY2 = event.clientY;
      }
      else{
        const speed = 1;
        const xChange = (this.xResizeStart - event.clientX)/speed;
        if(Math.abs(this.xResizeStart - this.rectangle.rectX1) > Math.abs(this.xResizeStart - this.rectangle.rectX2))
        {
          this.rectangle.rectX2 = Math.abs(this.rectangle.rectX2 - xChange);
        }
        else
        {          
          this.rectangle.rectX1 = Math.abs(this.rectangle.rectX1 - xChange);
        }
        this.xResizeStart = event.clientX;

        const yChange = (this.yResizeStart - event.clientY)/speed;
        if (Math.abs(this.yResizeStart - this.rectangle.rectY1) > Math.abs(this.yResizeStart - this.rectangle.rectY2))
        {
          this.rectangle.rectY2 = Math.abs(this.rectangle.rectY2 - yChange);
        }
        else
        {
          this.rectangle.rectY1 = Math.abs(this.rectangle.rectY1 - yChange);
        }
        this.yResizeStart = event.clientY;
      }
  }
}

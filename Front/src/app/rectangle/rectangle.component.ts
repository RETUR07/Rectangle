import { Component } from '@angular/core';
import { Rectangle } from 'src/app/models/rectangle.model';
import { RectangleHttpService } from 'src/app/services/rectangleHttpService';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.svg',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent {  
  public canvasX:number = 600;
  public canvasY:number = 600;

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
    const invisible_border = 10;
    if(event.clientX + invisible_border > this.canvasX || 
       event.clientX - invisible_border < 0 ||
       event.clientY + invisible_border > this.canvasY || 
       event.clientY - invisible_border < 0
       )
       {
         return;
       }
    if (this.IsEdited)
      if (!this.rectangleCreated){
        this.rectangle.rectX2 = event.clientX;
        this.rectangle.rectY2 = event.clientY;
      }
      else{
        const speed = 1;
        const xChange = (this.xResizeStart - event.clientX)/speed;
        const yChange = (this.yResizeStart - event.clientY)/speed;

        if(Math.abs(this.rectangle.rectX2 - event.clientX) < 20 && Math.abs(this.rectangle.rectY2 - event.clientY) < 20)
        {
          this.rectangle.rectX2 = Math.abs(this.rectangle.rectX2 - xChange);
          this.rectangle.rectY2 = Math.abs(this.rectangle.rectY2 - yChange);
        }

        if(Math.abs(this.rectangle.rectX1 - event.clientX) < 20 && Math.abs(this.rectangle.rectY1 - event.clientY) < 20)
        {
          this.rectangle.rectX1 = Math.abs(this.rectangle.rectX1 - xChange);
          this.rectangle.rectY1 = Math.abs(this.rectangle.rectY1 - yChange);
        }

        if(Math.abs(this.rectangle.rectX1 - event.clientX) < 20 && Math.abs(this.rectangle.rectY2 - event.clientY) < 20)
        {
          this.rectangle.rectX1 = Math.abs(this.rectangle.rectX1 - xChange);
          this.rectangle.rectY2 = Math.abs(this.rectangle.rectY2 - yChange);
        }

        if(Math.abs(this.rectangle.rectX2 - event.clientX) < 20 && Math.abs(this.rectangle.rectY1 - event.clientY) < 20)
        {
          this.rectangle.rectX2 = Math.abs(this.rectangle.rectX2 - xChange);
          this.rectangle.rectY1 = Math.abs(this.rectangle.rectY1 - yChange);
        }

        this.xResizeStart = event.clientX;
        this.yResizeStart = event.clientY;
      }
  }
}

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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

  public resizePoint: number = 0;

  constructor (private http: RectangleHttpService)
  {
    this.http.GetRectangle().subscribe((rec) =>
      {
        this.rectangle = rec;
        this.rectangleCreated = true;
      }
    );
  }

  @HostListener('document:mousedown', ['$event'])
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

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: any)
  {
    this.resizePoint = 0;
    this.rectangleCreated = true;
    this.IsEdited = false;
    this.http.SaveRectangle(this.rectangle).subscribe();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any)
  {
    const invisible_border = 20;

    //check create or resize
    if (this.IsEdited)
      if (!this.rectangleCreated){
        if (event.clientX + invisible_border < this.canvasX && event.clientX - invisible_border > 0)
          this.rectangle.rectX2 = event.clientX;
        if (event.clientY + invisible_border < this.canvasY && event.clientY - invisible_border > 0)
          this.rectangle.rectY2 = event.clientY;
      }
      else{
        const speed = 1;
        const xChange = (this.xResizeStart - event.clientX)/speed;
        const yChange = (this.yResizeStart - event.clientY)/speed;

        //check resize point
        if(Math.abs(this.rectangle.rectX2 - event.clientX) < 20 && Math.abs(this.rectangle.rectY2 - event.clientY) < 20)
        {
          this.resizePoint = 1;
        }
        else

        if(Math.abs(this.rectangle.rectX1 - event.clientX) < 20 && Math.abs(this.rectangle.rectY1 - event.clientY) < 20)
        {
          this.resizePoint = 2;
        }
        else

        if(Math.abs(this.rectangle.rectX1 - event.clientX) < 20 && Math.abs(this.rectangle.rectY2 - event.clientY) < 20)
        {
          this.resizePoint = 3;
        }
        else

        if(Math.abs(this.rectangle.rectX2 - event.clientX) < 20 && Math.abs(this.rectangle.rectY1 - event.clientY) < 20)
        {
          this.resizePoint = 4;
        }

        //resize
        switch(this.resizePoint)
        {
          case 1:
            if(
              this.rectangle.rectX2 - xChange + invisible_border < this.canvasX && 
              this.rectangle.rectX2 - xChange - invisible_border > 0
            ) 
            this.rectangle.rectX2 = this.rectangle.rectX2 - xChange;

            if(
              this.rectangle.rectY2 - yChange + invisible_border < this.canvasY && 
              this.rectangle.rectY2 - yChange - invisible_border > 0
            )
            this.rectangle.rectY2 = this.rectangle.rectY2 - yChange;

            break;
          case 2:
            if(
              this.rectangle.rectX1 - xChange + invisible_border < this.canvasX && 
              this.rectangle.rectX1 - xChange - invisible_border > 0
            )
            this.rectangle.rectX1 = this.rectangle.rectX1 - xChange;

            if(
              this.rectangle.rectY1 - yChange + invisible_border < this.canvasY && 
              this.rectangle.rectY1 - yChange - invisible_border > 0
            )
            this.rectangle.rectY1 = this.rectangle.rectY1 - yChange;

            break;
          case 3:
            if(
              this.rectangle.rectX1 - xChange + invisible_border < this.canvasX && 
              this.rectangle.rectX1 - xChange - invisible_border > 0
            )
            this.rectangle.rectX1 = this.rectangle.rectX1 - xChange;

            if(
              this.rectangle.rectY2 - yChange + invisible_border < this.canvasY && 
              this.rectangle.rectY2 - yChange - invisible_border > 0
            )
            this.rectangle.rectY2 = this.rectangle.rectY2 - yChange;

            break;
          case 4:
            if(
              this.rectangle.rectX2 - xChange + invisible_border < this.canvasX && 
              this.rectangle.rectX2 - xChange - invisible_border > 0
            ) 
            this.rectangle.rectX2 = this.rectangle.rectX2 - xChange;

            if(
              this.rectangle.rectY1 - yChange + invisible_border < this.canvasY && 
              this.rectangle.rectY1 - yChange - invisible_border > 0
            ) 
            this.rectangle.rectY1 = this.rectangle.rectY1 - yChange;
            break;
        }

        this.xResizeStart = event.clientX;
        this.yResizeStart = event.clientY;
      }
  }
}

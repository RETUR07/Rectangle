import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Rectangle } from 'src/app/Models/Rectangle.model';
import { HttpService } from 'src/app/services/httpService.service';

@Component({
  selector: '[app-rectangle]',
  templateUrl: './rectangle.component.svg',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent {  
  public IsEdited: boolean = false;
  public rectangle: Rectangle = new Rectangle();
  public rectangleCreated = false;

  public xResizeStart: number;
  public yResizeStart: number;

  constructor (private http: HttpService)
  {
    this.http.GetRectangle().subscribe((data:any)=>{
      this.rectangle.rectX1 = +data.x;
      this.rectangle.rectX2 = +data.x + +data.width;
      this.rectangle.rectY1 = +data.y;
      this.rectangle.rectY2 = +data.y + +data.height;
      this.rectangleCreated = true;
    });
  }

  private onMouseDownEventSubscription: Subscription;
  private onMouseUpEventSubscription: Subscription;
  private onMouseMoveEventSubscription: Subscription;
  private onMouseLeaveEventSubscription: Subscription;

  @Input() onMouseDownEvent: Observable<any>;
  @Input() onMouseUpEvent: Observable<any>;
  @Input() onMouseMoveEvent: Observable<any>;
  @Input() onMouseLeaveEvent: Observable<any>;

  ngOnInit(){
    this.onMouseDownEventSubscription = this.onMouseDownEvent.subscribe((event) => this.onMouseDown(event));
    this.onMouseUpEventSubscription = this.onMouseUpEvent.subscribe((event) => this.onMouseUp(event));
    this.onMouseMoveEventSubscription = this.onMouseMoveEvent.subscribe((event) => this.onMouseMove(event));
    this.onMouseLeaveEventSubscription = this.onMouseLeaveEvent.subscribe((event) => this.onMouseLeave(event));
  }

  ngOnDestroy() {
    this.onMouseDownEventSubscription.unsubscribe();
    this.onMouseUpEventSubscription.unsubscribe();
    this.onMouseMoveEventSubscription.unsubscribe();
    this.onMouseLeaveEventSubscription.unsubscribe();
  }

  onMouseLeave(event: any)
  {
    this.onMouseUp(event);
  }

  onMouseDown(event: any)
  {
    this.IsEdited = true;

    if(!this.rectangleCreated)
    {
      this.rectangle.rectX1 = event.clientX;
      this.rectangle.rectY1 = event.clientY;
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
    this.http.SaveRectangle(
      {
      x: this.rectangle.getX(),
      y: this.rectangle.getY(), 
      height: this.rectangle.getHeight(), 
      width: this.rectangle.getWidth()
    }).subscribe();
  }

  onMouseMove(event: any)
  {
    if (this.IsEdited)
      if (!this.rectangleCreated){
        this.rectangle.rectX2 = event.clientX;
        this.rectangle.rectY2 = event.clientY;
      }
      else{
        const speed = 40;
        const xChange = (this.xResizeStart - event.clientX)/speed;
        if(Math.abs(this.xResizeStart - this.rectangle.rectX1) > Math.abs(this.xResizeStart - this.rectangle.rectX2))
        {
          this.rectangle.rectX2 = Math.abs(this.rectangle.rectX2 - xChange);
        }
        else
        {          
          this.rectangle.rectX1 = Math.abs(this.rectangle.rectX1 - xChange);
        }

        const yChange = (this.yResizeStart - event.clientY)/speed;
        if (Math.abs(this.yResizeStart - this.rectangle.rectY1) > Math.abs(this.yResizeStart - this.rectangle.rectY2))
        {
          this.rectangle.rectY2 = Math.abs(this.rectangle.rectY2 - yChange);
        }
        else
        {
          this.rectangle.rectY1 = Math.abs(this.rectangle.rectY1 - yChange);
        }
      }
  }
}

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

  constructor (private http: HttpService)
  {
    this.http.GetRectangle().subscribe((data:any)=>{
      this.rectangle.rectX1 = +data.x;
      this.rectangle.rectX2 = +data.x + +data.width;
      this.rectangle.rectY1 = +data.y;
      this.rectangle.rectY2 = +data.y + +data.height;
    });
  }

  private onMouseDownEventSubscription: Subscription;
  private onMouseUpEventSubscription: Subscription;
  private onMouseMoveEventSubscription: Subscription;

  @Input() onMouseDownEvent: Observable<any>;
  @Input() onMouseUpEvent: Observable<any>;
  @Input() onMouseMoveEvent: Observable<any>;

  ngOnInit(){
    this.onMouseDownEventSubscription = this.onMouseDownEvent.subscribe((event) => this.onMouseDown(event));
    this.onMouseUpEventSubscription = this.onMouseUpEvent.subscribe((event) => this.onMouseUp(event));
    this.onMouseMoveEventSubscription = this.onMouseMoveEvent.subscribe((event) => this.onMouseMove(event));
  }

  ngOnDestroy() {
    this.onMouseDownEventSubscription.unsubscribe();
    this.onMouseUpEventSubscription.unsubscribe();
    this.onMouseMoveEventSubscription.unsubscribe();
  }

  onMouseDown(event: any)
  {
    this.IsEdited = true;
    this.rectangle.rectX1 = event.clientX;
    this.rectangle.rectY1 = event.clientY;
  }

  onMouseUp(event: any)
  {
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
    if (this.IsEdited){
      this.rectangle.rectX2 = event.clientX;
      this.rectangle.rectY2 = event.clientY;
    }
  }
}

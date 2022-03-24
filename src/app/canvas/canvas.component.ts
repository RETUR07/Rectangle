import { Component, EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.svg',
  styleUrls: ['./canvas.component.css']
})
@Injectable()
export class CanvasComponent {
  onMouseDownSubject: Subject<any> = new Subject<any>();
  onMouseUpSubject: Subject<any> = new Subject<any>();
  onMouseMoveSubject: Subject<any> = new Subject<any>();

  onMouseDown(event: any)
  {
    this.onMouseDownSubject.next(event);
  }

  onMouseUp(event: any)
  {
    this.onMouseUpSubject.next(event);
  }

  onMouseMove(event: any)
  {
    this.onMouseMoveSubject.next(event);
  }
}

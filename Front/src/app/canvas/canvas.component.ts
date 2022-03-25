import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.svg',
  styleUrls: ['./canvas.component.css']
})
@Injectable()
export class CanvasComponent {
  @Input() width = 300;
  @Input() height = 300;
}

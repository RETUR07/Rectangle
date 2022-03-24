import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';

import { HttpService } from './services/httpService.service';
import { RectangleComponent } from './canvas/rectangle/rectangle.component'

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    RectangleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';

import { RectangleComponent } from './rectangle/rectangle.component'
import { environment } from 'src/environments/environment';

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
  providers: [{ provide: 'API_URL', useValue: environment.apiURL }],
  bootstrap: [AppComponent]
})
export class AppModule { }

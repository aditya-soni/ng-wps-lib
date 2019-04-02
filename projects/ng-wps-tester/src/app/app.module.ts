import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgWpsLibModule } from "ng-wps-lib";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgWpsLibModule.forRoot({url: "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService", version : "2.0.0"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

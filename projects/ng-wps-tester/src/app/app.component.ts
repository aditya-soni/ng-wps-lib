import { Component, OnInit } from '@angular/core';
import { NgWpsLibService } from "ng-wps-lib";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng-wps-tester';
  constructor(private wpsService:NgWpsLibService){
  }
  ngOnInit(){
    this.wpsService.getCapabilities_GET(this.printThis);
  }

  printThis(resp){
    console.log(resp)
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private url : string ;
  private version : string;
  constructor() { }

  public setUrl (url:string){
      this.url = url
  }
  public setVersion (version:string){
      this.version = version;
  }
  public getUrl(){
      return this.url;
  }
  public getVersion(){
      return this.version;
  }
}

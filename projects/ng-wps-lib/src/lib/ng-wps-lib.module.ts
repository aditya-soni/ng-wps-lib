import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { NgWpsLibService,WpsConfigService } from "./ng-wps-lib.service";
import { HttpClientModule } from '@angular/common/http';

interface InitialConfig {
  url : string,
  version : string
}

@NgModule({
  imports:[
    HttpClientModule
  ]
})
export class NgWpsLibModule {
  static forRoot(config:InitialConfig) : ModuleWithProviders{
    return {
      ngModule : NgWpsLibModule,
      providers : [
        NgWpsLibService,
        {
          provide : WpsConfigService,
          useValue :config
        }
      ]
    }
  };

}

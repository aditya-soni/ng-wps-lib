import { Injectable, Inject, InjectionToken } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { parseString } from 'xml2js';
import { Process } from './models/Processes';

interface InitialConfig {
  wpsURL : string,
  version : string
}
export const WpsConfigService = new InjectionToken<InitialConfig>("InitialConfig");
@Injectable({
  providedIn: 'root'
})
export class NgWpsLibService {
  url :string;
  version : string;

  constructor(
    @Inject(WpsConfigService) private config,
    private settingsService:SettingsService,
    private http:HttpClient
  ) {
    this.settingsService.setUrl(config.url);
    this.url = config.url;
    this.settingsService.setVersion(config.version);
    this.version = config.version;
   }

   setVersion(version:string){
     this.settingsService.setVersion(version);
   }

   setUrl (url:string){
     this.settingsService.setUrl(url);
   }

   getCapabilities_GET(callback){
      // var capabilitiesRequest;
      var url = this.prepareGetCapabilitiesURL();
      const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(
        (response)=>{
          // xml doc retrived now convert to json

          parseString(response,(err,result)=>{
            if(!err)
           {
            result = this.processCapabilitiesResponse(result);
            callback(result);
           } else{
              console.log(result)
            } 
          })
        }
      )
   }

   prepareGetCapabilitiesURL(){
      var url = `${this.url}?service=WPS&version=${this.version}&request=GetCapabilities`;
      return url;
   }


   private processCapabilitiesResponse(response:any){
        
        let processes:Process[]= [];
        console.log(response);
        response["wps:Capabilities"]["wps:Contents"][0]["wps:ProcessSummary"].forEach(process => {
          let p = new Process(
            process["ows:Title"][0],
            process["ows:Identifier"][0],
            process.$.jobControlOptions,
            process.$.outputTransmission
            );
          processes.push(p);
        });
        let x = {
          Processes : processes,
          Details : {
            service : response["wps:Capabilities"].$.service, 
            version : response["wps:Capabilities"].$.version
          }
        }
        console.log(x)
        return x;

   }
}




// "capabilities":{  
//   "serviceIdentification":{  
//      "title":"52°North WPS 3.3.2-SNAPSHOT",
//      "abstractValue":"Service based on the 52°North implementation of WPS 1.0.0",
//      "keywords":[  
//         "WPS",
//         "geospatial",
//         "geoprocessing"
//      ],
//      "serviceType":"WPS",
//      "serviceTypeVersions":[
//        "ServiceTypeVersion":"1.0.0"
//        ]
//      "fees":"NONE",
//      "accessConstraints":"NONE"
//   },
//   "serviceProvider":{  
//      "providerName":"52North",
//      "providerSite":"http://www.52north.org/",
//      "serviceContact":{  
//         "individualName":"",
//         "contactInfo":{  
//            "address":{  
//               "deliveryPoint":"",
//               "city":"",
//               "administrativeArea":"",
//               "postalCode":"",
//               "country":"",
//               "electronicMailAddress":""
//            }
//         }
//      }
//   },
//   "operations":[  
//      {  
//         "DCP":{  
//            "HTTP":{  
//               "get":"http://geostatistics.demo.52north.org:80/wps/WebProcessingService?",
//               "post":"http://geostatistics.demo.52north.org:80/wps/WebProcessingService"
//            }
//         },
//         "name":"GetCapabilities"
//      },
//      {  
//         "DCP":{  
//            "HTTP":{  
//               "get":"http://geostatistics.demo.52north.org:80/wps/WebProcessingService?",
//               "post":"http://geostatistics.demo.52north.org:80/wps/WebProcessingService"
//            }
//         },
//         "name":"DescribeProcess"
//      }
//   ],
//   "processes":[  
//      {  
//         "title":"org.n52.wps.server.algorithm.CSWLoDEnablerStarter",
//         "identifier":"org.n52.wps.server.algorithm.CSWLoDEnablerStarter",
//         "processVersion":"1.1.0",
//         "jobControlOptions":"sync-execute async-execute",
//         "outputTransmission":"value reference"
//      },
//      {  
//         "title":"org.n52.wps.server.algorithm.JTSConvexHullAlgorithm",
//         "identifier":"org.n52.wps.server.algorithm.JTSConvexHullAlgorithm",
//         "processVersion":"1.1.0",
//         "jobControlOptions":"sync-execute async-execute",
//         "outputTransmission":"value reference"
//      }
//   ],
//   "service":"WPS",
//   "version":"2.0.0"
// }
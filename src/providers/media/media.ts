import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl ='http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  public getAllMediaWithTag(tag:string){
    return this.http.get(this.apiUrl+'/tags/' + tag);
  }

  public showTagsByFile(fileId:number){
    return this.http.get(this.apiUrl+'/tags/file/' + fileId);
  }

}

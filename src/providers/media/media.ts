import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ HttpHeaders} from "@angular/common/http";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  settingsX = {
    headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
  };

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

  public getUserInfo(userId:number){
    return this.http.get(this.apiUrl+'/users/'+userId,this.settingsX);
  }

}

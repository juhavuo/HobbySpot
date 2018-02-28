import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ HttpHeaders} from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  status: string;
  username: string;
  password: string;
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

  public getFileWithId(fileId:number){
    return this.http.get(this.apiUrl+'/media/'+fileId);
  }

  public getUserInfo(userId:number){
    return this.http.get(this.apiUrl+'/users/'+userId,this.settingsX);
  }

  public login() {

    const body = {
      username: this.username,
      password: this.password
    };



    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    this.http.post(this.apiUrl + '/login', body, settings).subscribe(response => {
      console.log(this.username);
      console.log(this.password);
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.status = error.message;
    });
  }

}

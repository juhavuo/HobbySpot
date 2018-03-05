import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class MediaProvider {

  status: string;
  username: string;
  password: string;
  email: string;

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
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl+'/users/'+userId,settings);
  }


  public login() {
    console.log('username: ' + this.username);
    console.log('password: ' + this.password);
    console.log('email: ' + this.email);

    const body = {
      username: this.username,
      password: this.password,
      email: this.email,
    };

    const settings = {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    };

    this.http.post(this.apiUrl + '/login', body, settings).subscribe(response => {
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.status = error.error.message;
    });
  }

  public getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/users/user', settings);
  }

  getMediaFiles(start: number, amount: number){
    return this.http.get(this.apiUrl + '/media?start=' + start + '&limit=' + amount);
  }

  public register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  public upload(formData) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    console.log("uploading image");
    return this.http.post(this.apiUrl + '/media', formData, settings);
  }

  public getCommentsByFileId(fileId:number){
    return this.http.get(this.apiUrl+'/comments/file/'+fileId);
  }

  public requestMedia(fileId: number){
    return this.http.get(this.apiUrl+'/media/'+fileId);
  }
}

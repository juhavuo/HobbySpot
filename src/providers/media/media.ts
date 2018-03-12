import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ForwardedTaginformation} from "../../models/ForwardedTaginformation";
import {TagInfo} from '../../models/TagInfo'


@Injectable()
export class MediaProvider {


  status: string;
  username: string;
  password: string;
  email: string;
  commentToAdd: string;
  isLoggedIn: boolean = false;

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl ='http://media.mw.metropolia.fi/wbma/uploads/';

  /*
  settingsX = {
    headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
  };*/

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  /*
    Fetches tags with beginning part as given by tagpart, like tagpart:tag
   */
  public getTagMarkedWith(taginfos: TagInfo[],tagpart: string){
    for (let i = 0; i < taginfos.length; ++i){
      let index = taginfos[i].tag.indexOf(':');
      if(index > 0){
        let address = taginfos[i].tag.substring(0,index);
        if(address === tagpart){
          if(taginfos[i].tag.length>index+1){
            return taginfos[i].tag.substring(index+1);
          }
        }
      }
    }

    return '';
  }

  /*
    Get list of tags with tagpart at
   */
  public getAdditionalTags(taginfos: TagInfo[]){
    let additionalTags: string[]= [];
    for (let i = 0; i < taginfos.length; ++i){
      let index = taginfos[i].tag.indexOf(':');
      if(index > 0){
        let address = taginfos[i].tag.substring(0,index);
        if(address === 'at'){
          if(taginfos[i].tag.length>index+1){
            additionalTags.push(taginfos[i].tag.substring(index+1));
          }
        }
      }
    }

    return additionalTags;

  }

  public containsTag(taginfos: TagInfo[], searchedTag: string){


    for (let i = 0; i< taginfos.length; ++i) {
      if (taginfos[i].tag === searchedTag) {
        return true;
      }
    }

    return false;
  }

  /*
  public getAllChannelTags(forwardedTags: ForwardedTaginformation[]){
    let tagInfos: TagInfo[] = [];
    let ctags: string[] = [];

    for (let i = 0; i < forwardedTags.length; ++i){
      if(forwardedTags[i].taginfo.length>1){
        if(ctags.indexOf(forwardedTags[i].taginfo[1].tag)<0) {
          ctags.push(forwardedTags[i].taginfo[1].tag);
        }
      }
    }

    return ctags;
  }*/

  /*
    Get all tags listed exept main tag like this:
    tagname, tagtype
    tagtypes are: channel,category,additional tag
   */
  public getTagslisted(forwardedTags: ForwardedTaginformation[]){
    let tags : string[] = [];
    for (let i = 0; i<forwardedTags.length;++i){
      for(let j = 0; j<forwardedTags[i].taginfo.length;++j){
        let tagToTrim = forwardedTags[i].taginfo[j].tag;
        if(tagToTrim.indexOf(':')>0){
          let tagToAdd = '';
          let tagParts = tagToTrim.split(':');
          if(tagParts[0] === 'ch'){
            tagToAdd = tagParts[1] +', channel';
          }else if(tagParts[0] === 'ca'){
            tagToAdd = tagParts[1]+', category';
          }else if(tagParts[0] === 'at'){
            tagToAdd = tagParts[1] +', additional tag';
          }
          if(tags.indexOf(tagToAdd)<0){
            tags.push(tagToAdd);
          }
        }
      }
    }
    return tags;
  }

  public getAllMediaWithTag(tag:string){
    return this.http.get(this.apiUrl+'/tags/' + tag);
  }


  /*
    Get all the tags of file by using it's id
   */
  public showTagsByFile(fileId:number){
    return this.http.get(this.apiUrl+'/tags/file/' + fileId);
    }

/*
  public getFileWithId(fileId:number){
    return this.http.get(this.apiUrl+'/media/'+fileId);
  }*/

  /*
    With this one can fetch user_name using id of the user
   */
  public getUserInfo(userId:number){

    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    }

    return this.http.get(this.apiUrl+'/users/'+userId, settings);
  }

  /*
    Gets the id, name and full name of the user
   */
  public getCurrentUser(){

    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.get(this.apiUrl + '/users/user', settings);

  }


  /*
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
  }*/

  /*
  public getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/users/user', settings);
  }*/

  /*
  getMediaFiles(start: number, amount: number){
    return this.http.get(this.apiUrl + '/media?start=' + start + '&limit=' + amount);
  }*/

  public register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  public upload(formData) {

    console.log("uploading image");

    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    }

    return this.http.post(this.apiUrl + '/media', formData, settings);
  }

  /*
    Get the comments of file by using it's id
   */
  public getCommentsByFileId(fileId:number){
    return this.http.get(this.apiUrl+'/comments/file/'+fileId);
  }

  /*
    Add a comment to file with given id
   */
  public addComment(fileId:number){

    const cBody = {
      "file_id": fileId,
      "comment": this.commentToAdd
    };

    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    }

    return this.http.post(this.apiUrl+'/comments',cBody, settings);
  }

  /*
    Adds one tag to file with given id
   */
  public addTag(fileId:number, tag:string){
    const tBody = {
      "file_id": fileId,
      "tag": tag
    };

    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.post(this.apiUrl+'/tags',tBody, settings);
  }

  /*
    Get all media parameters using file id (fetches for example file_title, file_name and so on...)
   */
  public requestMedia(fileId: number){
    return this.http.get(this.apiUrl+'/media/'+fileId);
  }
}

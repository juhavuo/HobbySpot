import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {Media} from '../../app/media';
import {HomePage} from '../home/home';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  file: File;
  media: Media = {
    title: '',
    description: '',
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];

  }

  public upload() {

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    console.log(formData);

    this.mediaProvider.upload(formData).subscribe(data => {
      console.log(data);
    }, (e: HttpErrorResponse) => {
      console.log(e);
    });
  }

  public home(){
    this.navCtrl.setRoot(HomePage);
  }

}

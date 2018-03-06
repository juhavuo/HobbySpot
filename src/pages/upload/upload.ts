import {Component, Renderer2} from '@angular/core';
import {
  IonicPage, LoadingController, NavController,
  NavParams, Platform,
} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {Media} from '../../app/media';
import {HomePage} from '../home/home';
import {LoginPage} from '../login/login';
import {Camera, CameraOptions} from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  imageURL
  canvas: any;
  imageData: string;

  file: File;
  media: Media = {
    title: '',
    description: '',
  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController,
              private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  public cancel(){
    let loader = this.loadingCtrl.create({
      content: 'Cancelling...',
      duration: 100,
    });
    loader.present();
    this.navCtrl.setRoot(HomePage);
  }

  public upload() {

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    console.log(formData);

    this.mediaProvider.upload(formData).subscribe(data => {
      console.log(data);
        this.navCtrl.setRoot(UploadPage);
    }, (e: HttpErrorResponse) => {
      console.log(e);
    });
  }

  captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      //let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.imageURL = imageData


    }, (err) => {
      // Handle error
    });

  }
}

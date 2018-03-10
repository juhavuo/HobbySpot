import {Component, Renderer2, ViewChild,ElementRef} from '@angular/core';
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
import {ForwardedTaginformation} from "../../models/ForwardedTaginformation";


@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  @ViewChild('myCanvas') canvasRef: ElementRef;

  tags: string[] = [];
  channelTags: string[] = [];

  mainTag= 'HobbySpotTest';

  ftags: ForwardedTaginformation[];

  file: File;
  media: Media = {
    title: '',
    description: '',
  };

  //tagsToAdd: string[] = [];
  channelToPut: string = '';
  categoryToPut: string = '';
  tagsAsString: string = '';
  moreTags: string[] = [];
  fileId: number = 0;
  uploadResponse: any;
  paramData: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController,
              private camera: Camera,
              private renderer: Renderer2) {

    this.navParams.get('paramsForUpload');
    this.paramData = this.navParams.data;
    this.ftags = this.paramData.forwarded_tags;
    this.channelTags = this.mediaProvider.getAllChannelTags(this.ftags);
    console.log('channels');
    console.log(this.channelTags);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  /*
  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }*/

  public cancel(){
    let loader = this.loadingCtrl.create({
      content: 'Cancelling...',
      duration: 100,
    });
    loader.present();
    this.navCtrl.setRoot(HomePage);
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

      this.uploadResponse = data;
      this.fileId = this.uploadResponse.file_id;

      let loader = this.loadingCtrl.create({
        content: 'Uploading media...',
        duration: 500,
      });

      this.tags = [this.mainTag];
      this.tags.push(this.channelToPut);
      this.tags.push(this.categoryToPut);
      this.moreTags = this.tagsAsString.split(',');
      for(let i = 0;i<this.moreTags.length;++i){
        this.tags.push(this.moreTags[i]);
      }
      for(let i = 0; i<this.tags.length;++i){
        console.log('tag to add:' + this.tags[i]);
        this.mediaProvider.addTag(this.fileId,this.tags[i]).subscribe( tagsresp => {
          console.log('tag response: ');
          console.log(tagsresp);
        });
        let loader = this.loadingCtrl.create({
          content: 'Adding tag nro ' + i + ' of ' + this.tags.length,
          duration: 1000,
        });
        loader.present();
      }

    }, (e: HttpErrorResponse) => {
      console.log(e);
    });
  }



}



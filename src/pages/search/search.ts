import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {Mediafile} from "../../models/Mediafile";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  data:any;
  searchTag: string = '';
  searchedFiles : Mediafile[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
    this.navParams.get('paramsForSearch');
    this.data = this.navParams.data;
    this.searchTag = this.data.tag;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.mediaProvider.getAllMediaWithTag(this.searchTag).subscribe((response:Mediafile[])=> {
      this.searchedFiles = response;
    });
  }

}

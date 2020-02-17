import { AccountProvider } from './../../providers/account/account';
import { UserProvider } from './../../providers/user/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MotStorageProvider } from 'src/app/providers/mot-storage/mot-storage';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-depression',
  templateUrl: './depression.page.html',
  styleUrls: ['./depression.page.scss'],
})
export class DepressionPage implements OnInit {

  horoscope = "horoskop";
  characteristics = "Jsi ";
  addressing ="";
  mediaFile;
  @ViewChild('ownvideo', null) ownVideo;
  
  constructor(
    private userProvider: UserProvider,
    private ac:AccountProvider,
    private storage:MotStorageProvider,
    private file: File
  ) { 

    this.userProvider.getDepressionData().subscribe((data)=> {
      this.addressing = this.ac.getAddressing();
      this.horoscope = this.ac.getAddressing() + ', ' + data['horoscope']['text'];
      
      const chars = data['characteristics'];
      if(chars != undefined) {
        this.characteristics += chars[0];
        for(let i = 1; i < chars.length; i++) {
          this.characteristics += ', ' + chars[i];
        }
      }
    });
  }

  playVideo() {
    
    let path = this.file.dataDirectory + this.mediaFile.name;
    let url = path.replace(/^file:\/\//, '');
    let video = this.ownVideo.nativeElement;
    video.src = url;
    video.play();
  }
  
  ngOnInit() {
    if(this.storage.exists("video")) {
      this.storage.get("video").then(res=> {
          this.mediaFile = JSON.parse(res) || {};
      });
  } else {
      this.mediaFile = [];
  }
  }

  hasVideo() : boolean {
    return !this.storage.exists("video");
  }
}

import { Component } from '@angular/core';
import { ApplicationRegisterService } from '../Service/application-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admit-card',
  standalone: false,
  templateUrl: './admit-card.component.html',
  styleUrl: './admit-card.component.css'
})
export class AdmitCardComponent {
latestrecord:any;
  filedata:any;
  status:any = 1;

  constructor(private registerserv:ApplicationRegisterService,private route:Router) { }

  ngOnInit() {
    this.status = localStorage.getItem('status');
    if(this.status == null || !this.status){this.status = 1;}
    let userid:any = "";
    if(this.status == '1'){
      userid = "";
    }else{
      userid = localStorage.getItem('userid');
    }
    this.registerserv.findLatestRecord(userid).subscribe(
      (response:any) => {
        this.latestrecord = response.data;
        this.filedata = response.file;
        this.showimage(this.filedata.photo,1);
        this.showimage(this.filedata.signatureEng,2);
        this.showimage(this.filedata.signatureHindi,3);
      },
      (error:any) => console.log(error)
     );
  }

  showimage (filename:any,status:any){
    this.registerserv.getProfilePhoto(filename,status).subscribe((data:any) => {
      console.log(data);
      this.createImage(data,status);
    }, (error:any) => {
      console.log(error);
    });
  }

  photo:any;
  signatureEng:any;
  signatureHindi:any;
  private createImage(image: Blob,status:any) {
    if (image && image.size > 0) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        if(status == 1){
          this.photo = reader.result;
        }else if(status == 2){
          this.signatureEng = reader.result;
        }else if(status == 3){
          this.signatureHindi = reader.result;
        }
        console.log(reader.result);
      }, false);
      reader.readAsDataURL(image);
    }
  }
}

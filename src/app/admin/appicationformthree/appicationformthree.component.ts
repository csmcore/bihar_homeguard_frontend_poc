import { Component } from '@angular/core';
import { ApplicationRegisterService } from '../Service/application-register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-appicationformthree',
  standalone: false,
  templateUrl: './appicationformthree.component.html',
  styleUrl: './appicationformthree.component.css'
})
export class AppicationformthreeComponent {

  latestrecord:any;
  filedata:any;
  status:any = 1;
  profilePictureUrl:any = "C:\pocfile\photo\poc_photo_20250402130225549.jpg"

  constructor(private registerserv:ApplicationRegisterService,private route:Router) { }

  ngOnInit() {
    let applicantid:any = localStorage.getItem('applicantid');
    this.status = localStorage.getItem('status');
    if(this.status == null || !this.status){this.status = 1;}
    let userid:any = "";
    if(this.status == '1'){
      userid = "";
    }else{
      userid = localStorage.getItem('userid');
    }
    if(applicantid){applicantid=applicantid;}else{applicantid = userid;}
    this.registerserv.findLatestRecord(applicantid).subscribe(
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

  routeing(){
    const checkbox = document.getElementById('declaration-checkbox') as HTMLInputElement;
    if (!checkbox || !checkbox.checked) {
      Swal.fire({
        title: "Error",
        text: "Please check the declaration checkbox before proceeding.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  }

  verifyOtp(){
    let applicantid:any = localStorage.getItem('applicantid');
    this.registerserv.finalsubmit(applicantid).subscribe(
       (response:any) => {
         if(response.status == 200){

           Swal.fire({
             title: "Application Submitted Successfully!",
             icon: "success",
             html: `
             <p><b>Application No.: <span style="color: green;">${this.latestrecord.applicationNo}</span></b></p>
             <p><b>Username: <span style="color: blue;">${this.latestrecord.applicationNo}</span></b></p>
             <p><b>Password: <span style="color: red;">AIPOC@123</span></b></p>
             `,
             showCloseButton: true,
             focusConfirm: true,
             confirmButtonText: "OK",
           }).then(() => {
             this.route.navigate(['/login']);
           });
         }else{
           Swal.fire('Failed','Something went wrong','error');
           return ;
         }
       },
       (error:any) => alert(error)
     );
  }

  downloadFile(fileName:any) {
    this.registerserv.downloadFile(fileName).subscribe(
      (response: any) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => console.log('Error downloading file:', error)
    );
  }

}

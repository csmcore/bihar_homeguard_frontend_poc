import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApplicationRegisterService } from '../Service/application-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-form-two',
  standalone: false,
  templateUrl: './application-form-two.component.html',
  styleUrl: './application-form-two.component.css'
})
export class ApplicationFormTwoComponent {

  constructor(private registerserv:ApplicationRegisterService,private route:Router) {}

  files: any=[];
  data: { [key: string]: any } = {};

  onImageFileSelected(event: any,id:any): void {
    if (event.target.files && event.target.files.length > 0) {
      for (const file of event.target.files) {
        const fileSizeInKB = file.size / 1024;
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (['jpg', 'jpeg', 'png'].includes(fileExtension) && fileSizeInKB >= 50 && fileSizeInKB <= 100) {
          this.data[id] = file;
        } else {
          alert(`Image file ${file.name} does not meet the criteria.`);
          return;
        }
      }
    } else {
      alert('No image file selected. This field is mandatory.');
      return;
    }
  }

  onDocumentFileSelected(event: any,id:any): void {
    if (event.target.files && event.target.files.length > 0) {
      for (const file of event.target.files) {
        const fileSizeInKB = file.size / 1024;
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (['pdf', 'doc', 'docx'].includes(fileExtension) && fileSizeInKB <= 200) {
            this.data[id] = file;
            console.log(`File stored with id ${id}:`, this.data[id]);
        } else {
          alert(`Document file ${file.name} does not meet the criteria.`);
          return;
        }
      }
    } else {
      alert('No document file selected. This field is mandatory.');
      return;
    }
  }

  submit(): void {
    console.log('Files:', this.files);

    const formFields = {
      photo: (document.getElementById('photo') as HTMLInputElement).value,
      signatureeng: (document.getElementById('signatureeng') as HTMLInputElement).value,
      signaturehindi: (document.getElementById('signaturehindi') as HTMLInputElement).value,
      resident: (document.getElementById('resident') as HTMLInputElement).value,
      physical: (document.getElementById('physical') as HTMLInputElement).value,
      matric: (document.getElementById('matric') as HTMLInputElement).value,
      gradutaion: (document.getElementById('gradutaion') as HTMLInputElement).value,
      gradutaionmark: (document.getElementById('gradutaionmark') as HTMLInputElement).value
    };
    for (const [key, value] of Object.entries(formFields)) {
      if (!value) {
      alert(`The field "${key}" is mandatory and cannot be empty.`);
      return;
      }
    }
    console.log('Form Fields:', formFields);
    let applicantid:any = localStorage.getItem('applicantid');
    const formData = new FormData();
    formData.append('photo', this.data['photo']);
    formData.append('signatureeng', this.data['signatureeng']);
    formData.append('signaturehindi', this.data['signaturehindi']);
    formData.append('resident', this.data['resident']);
    formData.append('physical', this.data['physical']);
    formData.append('matric', this.data['matric']);
    formData.append('gradutaion', this.data['gradutaion']);
    formData.append('gradutaionmark', this.data['gradutaionmark']);
    formData.append('applicantid', applicantid);

    this.registerserv.savefile(formData).subscribe(
      (response:any) => {
        if(response.status == 200){
          Swal.fire('Success','Document submitted successfully!','success');
          localStorage.setItem('status', '1');
          this.route.navigate(['/form-three']);
        }else{
          Swal.fire('Failed','File submission failed!','error');
        }
      },
      (error:any) => alert(error)
     );

  }
}

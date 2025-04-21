import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { ApplicationRegisterService } from '../Service/application-register.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-application-form-one',
  standalone: false,
  templateUrl: './application-form-one.component.html',
  styleUrl: './application-form-one.component.css'
})
export class ApplicationFormOneComponent {
  latestrecord:any;

  constructor(private registerserv:ApplicationRegisterService,private route:Router) { }

  submitForm() {
    const formFields = {
      applicantName: (document.getElementById('applicantName') as HTMLInputElement).value,
      fatherName: (document.getElementById('fatherName') as HTMLInputElement).value,
      motherName: (document.getElementById('motherName') as HTMLInputElement).value,
      district: (document.getElementById('district') as HTMLSelectElement).value,
      block: (document.getElementById('block') as HTMLSelectElement).value,
      post: (document.getElementById('post') as HTMLInputElement).value,
      policeStation: (document.getElementById('policeStation') as HTMLInputElement).value,
      village: (document.getElementById('village') as HTMLInputElement).value,
      address: (document.getElementById('address') as HTMLTextAreaElement).value,
      dob: (document.getElementById('dob') as HTMLInputElement).value,
      gender: (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value,
      caste: (document.querySelector('input[name="caste"]:checked') as HTMLInputElement)?.value,
      education: (document.querySelector('input[name="education"]:checked') as HTMLInputElement)?.value,
      mobile: (document.getElementById('mobile') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      criminal: (document.querySelector('input[name="criminal"]:checked') as HTMLInputElement)?.value,
      caseNumber: (document.getElementById('caseNumber') as HTMLInputElement).value,
      freedom: (document.querySelector('input[name="freedom"]:checked') as HTMLInputElement)?.value,
      idMark1: (document.getElementById('idMark1') as HTMLInputElement).value,
      idMark2: (document.getElementById('idMark2') as HTMLInputElement).value,
    };

    formFields.district='0';
    formFields.block='0';

    // Example validation for required fields
    for (const [key, value] of Object.entries(formFields)) {
      if (!value || value.trim() === '') {
        alert(`Please fill out the ${key} field.`);
        return;
      }
    }

    // Additional validations
    if (!/^[a-zA-Z\s]+$/.test(formFields.applicantName)) {
      alert('Please enter a valid name (letters and spaces only).');
      return;
    }

    if (!/^\d{10}$/.test(formFields.mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const age = this.calculateAge(new Date(formFields.dob));
    if (age < 19 || age > 40) {
      alert('Age must be between 19 and 40.');
      return;
    }

    this.registerserv.savedata(formFields).subscribe(
      (response:any) => {
        if(response.status == 200){
          Swal.fire('Success','Candidate Details submitted successfully!','success');
          this.route.navigate(['/form-two']);
          localStorage.setItem('applicantid', response.data);
        }else if (response.status == 401){
          Swal.fire('Failed',response.message,'error');
          return;
        }else{
          Swal.fire('Failed','submission failed!','error');
        }
      },
      (error:any) => console.log(error)
     );

    // alert('Form submitted successfully!');
  }

  currage:any;
  agecal(){
    let dobInput = (document.getElementById('dob') as HTMLInputElement).value;
    let dob = new Date(dobInput.replace(/-/g, '/'));
    this.currage = this.formatAge(dob)
  }
  formatAge(dob: Date): string {
    const now = new Date();
    const diff = now.getTime() - dob.getTime();

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    return `${years} वर्ष, ${months} माह, ${days} दिन`;
  }
  calculateAge(dob: Date): number {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationRegisterService } from '../Service/application-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private route:Router, private loginservice:ApplicationRegisterService) {}
  login() {
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const enteredCaptcha = (document.getElementById('captcha') as HTMLInputElement).value;

    if (enteredCaptcha != "SMWM") {
      alert('Incorrect Captcha!');
      return;
    }

    // Call API to validate username and password
    this.loginservice.validateCredentials(username, password).subscribe((isValid:any) => {
      console.log(isValid);
      if (isValid.status == 200) {
        if(isValid.password == 0){
          localStorage.setItem('userid', isValid.userid);
          this.route.navigate(['candidate-profile']);
        }else{
          this.route.navigate(['forgot-password']);
        }
      } else {
        Swal.fire('Error','Invalid username or password!','error');
        this.route.navigate(['/login']);
      }
    },(error:any) => {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    });
    this.route.navigate(['candidate-profile']);
  }

}

import { Component } from '@angular/core';
import { ApplicationRegisterService } from '../Service/application-register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  standalone: false,

  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  mobileNumber: string = '';
  otpDigits: string[] = new Array(6).fill('');
  otpSent: boolean = false;
  timer: number = 0;
  timerInterval: any;
  applicantid:any;
  userid:any;

  constructor(private registerserv: ApplicationRegisterService, private route: Router) { }

  getOTP() {
    const mobileval = document.getElementById('mobile') as HTMLInputElement;
    let mobile:any = mobileval?.value;
    this.registerserv.checkmobileno(mobile).subscribe(
      (response:any) => {
        if(response.status == 200) {
          this.applicantid = response.applicantid;
          this.userid = response.userid;
        }else if(response.status == 401){
          Swal.fire('Error', 'Mobile number not registered', 'error');
          return;
        }else{
          Swal.fire('Error', 'Something Went Wrong !', 'error');
          return;
        }
      },
      (error:any) => console.log(error)
     );

    if (this.otpSent) {
      // Reset the form for new mobile number
      this.otpSent = false;
      this.otpDigits = new Array(6).fill('');
      this.clearTimer();
    } else {
      console.log('Sending OTP to:', this.mobileNumber);
      this.otpSent = true;
      this.startTimer();
    }
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1 && index < 5) {
      // Move to next input
      const nextInput = document.querySelector(`input:nth-child(${index + 2})`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && index > 0 && !this.otpDigits[index]) {
      // Move to previous input on backspace if current input is empty
      const prevInput = document.querySelector(`input:nth-child(${index})`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  }

  otpverify:any=false;
  verifyOTP() {
    this.otpverify = true;
    Swal.fire('Success', 'OTP Verified Successfully', 'success');
  }

  resendOTP() {
    console.log('Resending OTP to:', this.mobileNumber);
    this.startTimer();
  }

  startTimer() {
    this.timer = 60;
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  backToLogin(event: Event) {
    event.preventDefault();
    console.log('Navigating back to login');
  }

  changePassword() {
    const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;

    const newPassword = newPasswordInput?.value;
    const confirmPassword = confirmPasswordInput?.value;

    if (!newPassword || !confirmPassword) {
      Swal.fire('Error', 'Both fields are mandatory', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    this.registerserv.changePassword(this.userid,newPassword).subscribe(
      (response: any) => {
        if (response.status == 200) {
          Swal.fire('Success', 'Password changed successfully', 'success');
          this.route.navigate(['/login']);
        }else if (response.status == 401) {
          Swal.fire('Error', 'User Not Found !', 'error');
        } else {
          Swal.fire('Error', 'Failed to change password', 'error');
        }
      },
      (error: any) => {
        console.error(error);
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    );
  }
}

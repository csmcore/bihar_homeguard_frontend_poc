import { Component, OnInit } from '@angular/core';
import { ApplicationRegisterService } from '../Service/application-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-profile',
  standalone: false,
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css'
})
export class CandidateProfileComponent implements OnInit {
  latestRecord:any;

  constructor(private registerserv:ApplicationRegisterService,private route:Router) { }
  // Add any necessary logic for the candidate profile component here
  // For example, you might want to fetch and display user data from a service
  ngOnInit() {
    let userid = localStorage.getItem('userid');
    if(!userid){
      setTimeout(() => {
        userid = localStorage.getItem('userid');
      }, 2000);
    }
    setTimeout(() => {
      this.getrecord();
    }, 1000);

  }

  getrecord(){
    let userid = localStorage.getItem('userid');
    this.registerserv.findLatestRecord(userid).subscribe(
      (response:any) => {
        this.latestRecord = response.data;
      },
      (error:any) => console.log(error)
     );
  }

  priview(){
    localStorage.setItem('status', '2');
    this.route.navigate(['/form-three']);
  }

  admitcard(){
    this.route.navigate(['/admit-card']);
  }

}

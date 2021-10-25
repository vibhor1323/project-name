import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageAuthService } from './landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  isOtp=false;
  isLogin=false;

  constructor(
    private authservice:LandingPageAuthService,
    private router:Router
  ) { }

  
  

  onSubmit(form:NgForm){
    // console.log(form)
    if(!form.valid){
      return 
    }
    const ph = form.value.phoneNumber;
    // console.log(ph);
    

    if(this.isLogin)
    {
      const otp =form?.value?.otp;
      this.authservice.login(ph,otp).subscribe(
        (
          Response:any
          )=> {
          console.log(Response);
          this.router.navigate(['/item']);
        }
      );
    }
    else{
      this.isOtp=true;
      this.isLogin=true;
      this.authservice.otp(ph).subscribe(
        (
          Response:any
        ) => {
          console.log(Response)
        }
      );
    }
  }

  ngOnInit() {
  }

}

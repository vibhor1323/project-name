
import { Component, OnInit } from '@angular/core';
import { LandingPageAuthService } from '../landing-page/landing-page.service';




@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  ph_number!:string


  

  constructor(
    private authService :LandingPageAuthService
  ) { 
    }

  ngOnInit(){
    const userData:{
      mobile_number:string
    }= JSON.parse(localStorage.getItem("UserDetails")!)
    // console.log(userData.mobile_number) 
    this.ph_number=userData.mobile_number;     

  }

  logout(){
      this.authService.logout();
  }

}

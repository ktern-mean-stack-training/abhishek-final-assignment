import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private route: Router){}

  ngOninit():void{
    throw new Error('Method not implemented!!');
  }

  goToHome(){
    this.route.navigate(['home'])
  }

  goToAbout(){
    this.route.navigate(['about'])
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstpageComponent {
  constructor(private route: Router){}

  ngOninit():void{
    throw new Error('Method not implemented!!');
  }

  goTohome(){
    this.route.navigate(['home'])
  }

}

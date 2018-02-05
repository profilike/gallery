import { Component } from '@angular/core';

@Component({
  selector: 'vpb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isShow: boolean = false

  showMenu(){
    this.isShow = !this.isShow
  }

}



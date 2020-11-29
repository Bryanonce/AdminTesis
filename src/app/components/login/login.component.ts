import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('userEmail') userEmail: ElementRef;
  @ViewChild('userPass') userPass: ElementRef;
  private permitirIngreso:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  getCredentials(){
    let user = this.userEmail.nativeElement.value;
    let pass = this.userPass.nativeElement.value;
    return [user,pass]
  }

}

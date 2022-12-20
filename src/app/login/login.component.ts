import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private shared: QuestionService
  ) { }
  
  signupUsers: any[] = [];

  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  }
  loginObj: any = {
    userName: '',
    password: '',
    email: ''
  }



  ngOnInit(): void {
    const localData = localStorage.getItem('SignUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData)
    }
    else {
      console.warn("No Data saved in LocalStorage");

    }
  }

  onSignup() {
    // console.warn('signup btn fired');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Signed Up SuccessFully',
      showConfirmButton: true,
      // timer: 1500
    })
    // alert("Signed Up SuccessFully")
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('SignUpUsers', JSON.stringify(this.signupUsers))
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    }

  }
  onLogin() {
    // console.warn('login btn fired');

    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password && m.email == this.loginObj.email);
    if (isUserExist != undefined) {
      const logged_NAME = isUserExist.userName
      console.warn('checking name', logged_NAME);
      this.shared.setMessage(logged_NAME)

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Signed Up SuccessFully',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        this.router.navigate(['/question'])
      }, 1500);

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong UserName & Password',
      })
      // alert("Wrong UserName & Password")

    }
  }
}

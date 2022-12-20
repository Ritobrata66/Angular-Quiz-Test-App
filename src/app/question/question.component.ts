import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  isQuizCompleted: boolean = false
  finalscore:any

  // rowData: any[]=[
  //   {  }
  // ]


  constructor(
    private questionService: QuestionService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.name = this.questionService.getMessage()
    // this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    setTimeout(() => {
      console.warn("GETTING Question from Json", this.questionList);
    }, 1000);
  }
  logedout(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'You have been logged out',
      showConfirmButton: false,
      timer: 1500
    })
    // alert("LogedOut" )
    setTimeout(() => {
      this.router.navigate([''])
    }, 1500);
  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions
      })
  }

  
  resetQuiz() {
    this.getAllQuestions();
    this.currentQuestion = 0
    this.points = 0
    this.ngOnInit()
    this.isQuizCompleted = false;
  }

  answer(currentQno: number, option: any) {

    if (currentQno === this.questionList.length) {
      
      setTimeout(() => {
        this.finalscore = this.points
        console.warn('Final points' , this.finalscore);
        this.isQuizCompleted = true;
      }, 1000);

    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++
      setTimeout(() => {
        this.currentQuestion++
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion++
        this.inCorrectAnswer++
      }, 1000);
      this.points -= 10;
    }
  }
  
  // nextQuestion() {
  //   this.currentQuestion++
  // }
  // previousQuestion() {
  //   this.currentQuestion--
  // }

  // check(currentQno2: number, C_option: any) {
  //   console.warn(C_option);
  //   (document.querySelector('#select_O') as HTMLElement).style.background = 'green';
  // }



}

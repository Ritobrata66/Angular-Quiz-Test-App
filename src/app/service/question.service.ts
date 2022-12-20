import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class QuestionService {
  message:any

  constructor(private http :HttpClient) { }

  getQuestionJson(){
    return this.http.get<any>("assets/questions.json"); 
  }

  setMessage(data:any){
    this.message =data
  }
  getMessage(){
   return this.message 
  }
}

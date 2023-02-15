import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private http:HttpClient){}
  title = 'calculator';
  num1:string='';
  num2: string='';
  op:string='';
  display='00';
  exprission='';
  small_exp='';
  result:any;
  flag=0;
  
  from_back(first:string, second:string, operator:string){
    
    this.http.get('http://localhost:8081/calculator/exp',
  {responseType:'text',
      params:{
        number1:first,
        number2:second,
        op:operator},
        observe:'response'}).subscribe(response => {
          this.result=response.body
          if (this.result!=null)
          {
            if(this.result=="Math Error"){
              this.num1='';
            }
            else{
              this.num1=this.result;
            }
            
            this.display=this.result;
            console.log("hh"+this.num1);
          }
          this.flag=1;
        })
        
  }
  write(char:string){
    this.exprission+=char;
    this.display=this.exprission;
    if(this.op==''){
      this.num1=this.display;
    }
    else{
      this.num2=this.display;
      this.small_exp=this.num1+this.op+this.num2;
    }
    console.log(this.num1+" "+this.num2 +' '+this.op);
  }
  clear(){
    this.display='00';
    this.exprission='';
    this.small_exp='';
    this.num1='';
    this.num1='';
    this.op='';
  }
  del(){ 
    if(this.display.slice(-2)==".0"){
      this.display=this.display.slice(0, -3);
      this.small_exp=this.small_exp.slice(0, -3); 
    }
    else{
      this.display=this.display.slice(0, -1);
      this.small_exp=this.small_exp.slice(0, -1);
    }
    this.exprission=this.display;
    if(this.num1!="" && this.num2==""){
      this.num1=this.exprission;
    }
    else if(this.num1!="" && this.num2!=""){
      this.num2=this.exprission;
    }
}
  operation(operator:string){
    
    if(operator=='^-1' || operator=='^2' || operator=='root' || operator=='*-1'){
      console.log("22");
      if(this.num1!='' && this.op==''){
        this.op=operator;
        this.evaluate("");
      }
      else{
        this.evaluate("");
      }
    }
    else if(this.op!=''){
      console.log("11");
      this.evaluate(operator);
    }
    else if(this.num1!=''){
      console.log("33");
      this.op=operator;
      this.small_exp=this.num1+operator;
      this.exprission='';
    }
  }
  evaluate(operator:string){
    this.small_exp='';
    this.from_back(this.num1,this.num2,this.op)
    this.num2='';
    this.op=operator;
    this.exprission='';
    console.log("k"+this.op);
  }
}

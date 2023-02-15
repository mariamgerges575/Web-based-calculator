package com.calculator.assignment2;
import org.springframework.web.bind.annotation.*;
import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/calculator")
public class Backend {
    @GetMapping ("/exp")
    public String evaluate (@RequestParam String number1,@RequestParam String number2,@RequestParam String op ){
        System.out.println(number1+"n2 "+number2+""+op);
        double result=0;
        double n1 = Double.parseDouble(number1);
        if(Objects.equals(number2, "")){
            switch (op){
                case "root" :
                    if(n1<0){
                        return "Math Error";
                    }
                    result = Math.sqrt(n1);
                    break;
                case "^-1" :
                    result = 1/n1;
                    break;
                case "^2" :
                    result = n1*n1;
                    break;
                case "*-1":
                    result=n1*-1;
            }
        }
        else {
            double n2= Double.parseDouble(number2);
            switch (op){
                case "+":
                    result=n1+n2;
                    break;
                case "-":
                    result=n1-n2;
                    break;
                case "*":
                    result=n1*n2;
                    break;
                case "/":
                    if(n2 == 0){
                        return "Math Error";
                    }else {
                        result = n1 / n2;
                        break;
                    }
                case"%":
                    result = n1 % n2;
                    break;
            }
        }
        System.out.println(String.valueOf(result));
        return String.valueOf(result);
    }
}



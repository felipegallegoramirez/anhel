import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService} from "./../services/user.service"
import { Temporal } from "../models/temporal";
import { User } from "../models/user";

@Component({
  selector: 'app-porfile',
  templateUrl: './porfile.component.html',
  styleUrls: ['./porfile.component.css'],
  providers: [UserService]
})
export class PorfileComponent implements OnInit {

  constructor(private userService : UserService) { }
  data:any =null;
  as:string="";
  
  ngOnInit(): void {
    this.data=localStorage.getItem('persona')
    this.data=JSON.parse(this.data)
    this.actualizar

  }
  formExample = new FormGroup({

    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    number: new FormControl('',[Validators.required]),
    //age: new FormControl('',[Validators.required]),
    //profesional_info: new FormControl('',[Validators.required])
  });

  actualizar():any{
    var ra =<HTMLInputElement> document.getElementById('email')
    ra.value=this.data.email
    ra =<HTMLInputElement> document.getElementById('name')
    ra.innerHTML =this.data.name
  }


  send():any{
    this.formExample.setValue(this.data.email)
    /*
    let usuario=new User;
    if(this.data!=null) { 
      usuario.name= this.formExample.value.name
      usuario.email= this.formExample.value.email
      usuario.phonenumber = this.formExample.value.number
      //usuario.age = this.formExample.value.age
      this.userService.putUser(usuario,this.data.id).subscribe((res)=>{})
      window.location.replace("http://localhost:4200/about");
    }
    this.formExample.reset()
  */
  }
}

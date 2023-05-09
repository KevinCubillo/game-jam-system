import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-jam',
  templateUrl: './form-jam.component.html',
  styleUrls: ['./form-jam.component.css'],
  
})
export class FormJamComponent {
  constructor(private formBuilder:FormBuilder) { }

  categories:string[] = []
  public experiences:string[] = []


  public formJam = this.formBuilder.group({
    id: [''],
    categories: ['', Validators.required],
    name: ['', Validators.required],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    theme: ['', Validators.required],
  });


  public setDropdownExperienceValue(value:string){
    this.experiences.push(value)
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JamService } from 'src/app/services/jam.service';

@Component({
  selector: 'app-form-jam',
  templateUrl: './form-jam.component.html',
  styleUrls: ['./form-jam.component.css'],
  
})
export class FormJamComponent {
  constructor(private formBuilder:FormBuilder, private jamService: JamService) { }
  public categories:string[] = []
  public experiences:string[] = []


  public formJam = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    theme: ['', Validators.required],
    categorie: ['', Validators.required],
  });


  public setDropdownExperienceValue(value:string){
    this.experiences.push(value)
  }

  public onToggle(categorie:string) {
    this.categories.push(categorie)
    this.formJam.controls['categorie'].setValue(this.categories[0])
  }

  public onSubmit() {
    console.log(this.formJam.value)
    this.jamService.createJam(this.formJam.value).subscribe((data) => {
      console.log(data)
    })
  }


}

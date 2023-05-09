import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Jam } from 'src/app/models/Jam';
import { JamService } from 'src/app/services/jam.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-jam',
  templateUrl: './form-jam.component.html',
  styleUrls: ['./form-jam.component.css'],
  
})
export class FormJamComponent implements OnInit{
  constructor(private formBuilder:FormBuilder, private jamService: JamService, private router: Router, private ARoute:ActivatedRoute) { }
  public categories:string[] = []
  public experiences:string[] = []
  private isUpdate: boolean = false;


  public formJam = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    theme: ['', Validators.required],
    categorie: ['', Validators.required],
  });

  ngOnInit(): void {
    this.ARoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isUpdate = true;
        this.jamService.getJamById(id).subscribe((jamData: Object) => {
          const jam = jamData as Jam;
          this.formJam.patchValue(jam);
        });
      }
    });
  }


  public setDropdownExperienceValue(value:string){
    this.experiences.push(value)
  }

  public onToggle(categorie:string) {
    this.categories.push(categorie)
    this.formJam.controls['categorie'].setValue(this.categories[0])
  }

  public onSubmit() {
    if(!this.isUpdate){
    this.jamService.createJam(this.formJam.value).subscribe((data) => {
      console.log(data)
    })}
    else{
      this.jamService.updateJam(this.formJam.value.id ?? "", this.formJam.value).subscribe((data) => {
        console.log(data)
      })
    }
    this.router.navigate(['/list/jam']);
  }


}

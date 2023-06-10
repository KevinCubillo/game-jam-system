import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Jam } from 'src/app/models/Jam';
import { JamService } from 'src/app/services/jam.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-jam',
  templateUrl: './form-jam.component.html',
  styleUrls: ['./form-jam.component.css'],
})
export class FormJamComponent implements OnInit {
  public formJam!: FormGroup;
  public experiences: string[] = [];
  private isUpdate: boolean = false;
  private Id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private jamService: JamService,
    private router: Router,
    private ARoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formJam = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      theme: ['', Validators.required],
      categories: this.formBuilder.array([]),
    });

    this.ARoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.Id = id;
        this.isUpdate = true;
        this.jamService.getJamById(id).subscribe((jamData: Object) => {
          const jam = jamData as Jam;
          this.formJam.patchValue({
            id: jam._id,
            name: jam.name,
            startDate: jam.startDate,
            endDate: jam.endDate,
            theme: jam.theme,
          });
          this.categories.clear();
          jam.categories.forEach((category: string[]) => {
            this.addCategory(category[0], category[1]);
          });
        });
      }
    });
  }

  get categories() {
    return this.formJam.get('categories') as FormArray;
  }

  addCategory(name: string = '', description: string = '') {
    const categoryFormGroup = this.formBuilder.group({
      name: [name],
      description: [description]
    });
    this.categories.push(categoryFormGroup);
  }

  setDropdownExperienceValue(value: string) {
    this.experiences.push(value);
  }

  onToggle(category: { name: string; description: string }) {
    const selectedCategories = this.formJam.get('categories') as FormArray;
    const index = selectedCategories.value.findIndex((cat: { name: string }) => cat.name === category.name);
    if (index === -1) {
      this.addCategory(category.name, category.description);
    } else {
      selectedCategories.removeAt(index);
    }
  }

  isCategorySelected(category: { name: string; description: string }): boolean {
    const selectedCategories = this.formJam.get('categories')?.value as { name: string; description: string }[];
    return selectedCategories?.some((cat) => cat.name === category.name) ?? false;
  }

  onSubmit() {
     if (!this.isUpdate) {
    const jamData = {
      ...this.formJam.value,
      categories: this.formJam.value.categories.map((category: { name: string, description: string }) => [category.name, category.description])
    };
    this.jamService.createJam(jamData).subscribe((data) => {
      console.log(data);
    });
    } else {
      this.jamService.updateJam(this.Id ?? '', this.formJam.value).subscribe((data) => {
        console.log(data);
      });
    }
    this.router.navigate(['/list/jam']);
  }
}

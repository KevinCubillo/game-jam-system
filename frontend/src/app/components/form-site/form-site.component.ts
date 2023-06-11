import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Site } from 'src/app/models/Site';
import { SiteService } from 'src/app/services/site.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-site',
  templateUrl: './form-site.component.html',
  styleUrls: ['./form-site.component.css'],
})
export class FormSiteComponent implements OnInit {
  public formSite!: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private siteService: SiteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formSite = this.formBuilder.group({
      _id: [''],
      globalOrganizer: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      judges: this.formBuilder.array([]),
      localOrganizers: this.formBuilder.array([]),
      mentors: this.formBuilder.array([]),
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.siteService.getSiteById(id).subscribe((siteData: any) => {
          const site = siteData as Site;
          this.formSite.patchValue(site);
          this.setFormArrayValues(this.judges, site.judges);
          this.setFormArrayValues(this.localOrganizers, site.localOrganizers);
          this.setFormArrayValues(this.mentors, site.mentors);
        });
      }
    });
  }

  get judges() {
    return this.formSite.get('judges') as FormArray;
  }

  addJudge(judge: string = '') {
    this.judges.push(this.formBuilder.control(judge));
  }

  removeJudge(index: number) {
    this.judges.removeAt(index);
  }

  get localOrganizers() {
    return this.formSite.get('localOrganizers') as FormArray;
  }

  addLocalOrganizer(organizer: string = '') {
    this.localOrganizers.push(this.formBuilder.control(organizer));
  }

  removeLocalOrganizer(index: number) {
    this.localOrganizers.removeAt(index);
  }

  get mentors() {
    return this.formSite.get('mentors') as FormArray;
  }

  addMentor(mentor: string = '') {
    this.mentors.push(this.formBuilder.control(mentor));
  }

  removeMentor(index: number) {
    this.mentors.removeAt(index);
  }

  onSubmit() {
    const siteData = this.formSite.value;
    if (siteData._id) {
      this.siteService.updateSite(siteData._id, siteData).subscribe((data) => {
        console.log(data);
      });
    } else {
      this.siteService.createSite(siteData).subscribe((data) => {
        console.log(data);
      });
    }
    this.router.navigate(['/sites']);
  }

  private setFormArrayValues(formArray: FormArray, values: string[]) {
    formArray.clear();
    if (values && values.length > 0) {
      values.forEach((value: string) => {
        formArray.push(this.formBuilder.control(value));
      });
    }
  }
}


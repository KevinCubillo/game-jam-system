import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Site } from '../../models/Site';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-site',
  templateUrl: './form-site.component.html',
  styleUrls: ['./form-site.component.css'],
})

export class FormSiteComponent implements OnInit{
  site: Site = {
    _id: '',
    jamId: '',
    country: '',
    city: '',
    judges: [],
    localOrganizers: [],
    mentors: []
  };

  judgeInput: string = '';
  localOrganizerInput: string = '';
  mentorInput: string = '';

  constructor(private siteService: SiteService, private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const jamId: string | null = this.activeRoute.snapshot.paramMap.get('id');
    if (jamId) {
      this.site.jamId = jamId;
    }
  }

  addJudge() {
    if (this.judgeInput.trim() !== '') {
      this.site.judges.push(this.judgeInput.trim());
      this.judgeInput = '';
    }
  }

  addLocalOrganizer() {
    if (this.localOrganizerInput.trim() !== '') {
      this.site.localOrganizers.push(this.localOrganizerInput.trim());
      this.localOrganizerInput = '';
    }
  }

  addMentor() {
    if (this.mentorInput.trim() !== '') {
      this.site.mentors.push(this.mentorInput.trim());
      this.mentorInput = '';
    }
  }

  removeJudge(judge: string) {
    this.site.judges = this.site.judges.filter(j => j !== judge);
  }

  removeLocalOrganizer(localOrganizer: string) {
    this.site.localOrganizers = this.site.localOrganizers.filter(lo => lo !== localOrganizer);
  }

  removeMentor(mentor: string) {
    this.site.mentors = this.site.mentors.filter(m => m !== mentor);
  }

  async submitForm() {
    const { _id, ...newSite } = this.site; // Destructure and exclude _id field
    await this.siteService.createSite(newSite).subscribe(
      (response) => {
        // Handle the response from the service if needed
        console.log('Site created:', response);
      },
      (error) => {
        // Handle the error if it occurs
        console.error('Error creating site:', error);
      }
    );
    this.router.navigate(['/singlejam', this.site.jamId]);
  }
  
  
}

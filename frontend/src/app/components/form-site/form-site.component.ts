import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Site } from '../../models/Site';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.interface';

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
  constructor( private siteService: SiteService,
    private activeRoute: ActivatedRoute,
    private router: Router) {}

  judgeInput: string = '';
  localOrganizerInput: string = '';
  mentorInput: string = '';

  ngOnInit() {
    const jamId: string | null = this.activeRoute.snapshot.paramMap.get('id');
    if (jamId) {
      this.site.jamId = jamId;
      this.siteService.getUsersByRoleAndSite(this.site._id, ['MENTOR', 'JUDGE', 'LOCALORGANIZER']).subscribe(
        (users: User[]) => {
          // Asignar usuarios a los arreglos correspondientes según su rol
          this.site.mentors = users.filter(user => user.roles.includes('MENTOR'));
          this.site.judges = users.filter(user => user.roles.includes('JUDGE'));
          this.site.localOrganizers = users.filter(user => user.roles.includes('LOCALORGANIZER'));
        },
        (error: any) => {
          // Manejar cualquier error en la solicitud
          console.error('Error al obtener los usuarios:', error);
        }
      );
    }
  }

  
  addPerson() {
    this.router.navigate(['/assign/role/', this.site._id]);
  }

  removeJudge(judgeId: string) {
    this.site.judges = this.site.judges.filter(judge => judge._id !== judgeId);
  }

  removeLocalOrganizer(localOrganizerId: string) {
    this.site.localOrganizers = this.site.localOrganizers.filter(localOrganizer => localOrganizer._id !== localOrganizerId);
  }

  removeMentor(mentorId: string) {
    this.site.mentors = this.site.mentors.filter(mentor => mentor._id !== mentorId);
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

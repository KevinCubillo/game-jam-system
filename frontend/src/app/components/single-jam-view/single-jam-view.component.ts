import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jam } from 'src/app/models/Jam';
import { JamService } from 'src/app/services/jam.service';
import { Site } from 'src/app/models/Site';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-single-jam-view',
  templateUrl: './single-jam-view.component.html',
  styleUrls: ['./single-jam-view.component.css']
})
export class SingleJamViewComponent implements OnInit {
  jam!: Jam;
  sites: Site[] = [];
  jamId: string = '';

  constructor(
    private route: ActivatedRoute,
    private jamService: JamService,
    private siteService: SiteService,
    private router: Router,   
  ) {}

   ngOnInit() {
    const jamId: string | null = this.route.snapshot.paramMap.get('id');
    if (jamId) {
      this.jamId = jamId;
      this.jamService.getJamById(jamId).subscribe(
        (data: any) => {
          this.jam = data;
          console.log('sites', this.jam.sites);
          console.log('jam', this.jam);
           // Obtener los objetos Site utilizando los IDs de los sitios
          this.getAndSetSites(this.jam.sites);
          
        },
        (error: any) => {
          console.error('Error al obtener los detalles de la jam:', error);
        }
      );
    }
  }

  getAndSetSites(siteIds: string[]) {
    for (const siteId of siteIds) {
      this.siteService.getSiteById(siteId).subscribe(
        (site: any) => {
          this.sites.push(site);
        },
        (error: any) => {
          console.error('Error al obtener el sitio:', error);
        }
      );
    }
  }

  addSite() {
    this.router.navigate(['/create/site/', this.jamId]);
  }

  deleteSite(siteId: string) {
    this.siteService.deleteSite(siteId).subscribe(
      () => {
        console.log('Site deleted successfully.');
        location.reload();
      },
      (error) => {
        console.log('Error deleting site:', error);
      }
    );
  }
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jam } from 'src/app/models/Jam';
import { JamService } from 'src/app/services/jam.service';


@Component({
  selector: 'app-jams-view',
  templateUrl: './jams-view.component.html',
  styleUrls: ['./jams-view.component.css',
              './../../../assets/css/animate.css',
              './../../../assets/css/flex-slider.css',
              './../../../assets/css/fontawesome.css',
              './../../../assets/css/owl.css',
              './../../../assets/css/templatemo-cyborg-gaming.css']
})


export class JamsViewComponent {
    constructor(private jamService: JamService, private router: Router) {
      
    }

    /*============== OBTENER TODAS LAS JAMS ==================*/
    jams: Jam[] = [];
    ngOnInit() {
      this.jamService.getJam().subscribe((data: any) => {
        this.jams = Object.values(data);
      });
    }  
}

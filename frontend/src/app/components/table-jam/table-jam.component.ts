
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jam } from 'src/app/models/Jam';
import { JamService } from 'src/app/services/jam.service';




@Component({
  selector: 'app-table-jam',
  templateUrl: './table-jam.component.html',
  styleUrls: ['./table-jam.component.css']
})
export class TableJamComponent implements OnInit {
  constructor(private jamService: JamService, private router: Router) {
    
  }

  /*============== OBTENER TODAS LAS JAMS ==================*/
  jams: Jam[] = [];
  ngOnInit() {
    this.jamService.getJam().subscribe((data: any) => {
      this.jams = Object.values(data);
    });
  }


  /*============== ELIMINAR UNA JAM ==================*/

  public delete(id: string) {
    this.jamService.deleteJam(id).subscribe(
      () => {
        console.log("Jam deleted successfully.");
        location.reload();
      },
      (error) => {
        console.log("Error deleting jam:", error);
      }
    );
    this.router.navigate(['/list/jam']);
  }

  /*============== ACTUALIZAR UNA JAM ==================*/

  public edit(jamId: string): void {
    this.jamService.getJamById(jamId).subscribe((jamData: Object) => {
      const jam = jamData as Jam;
      this.router.navigate(['/update/jam'], { state: { jam: jam } });
    });
  }
}
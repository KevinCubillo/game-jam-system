import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jam } from 'src/app/models/Jam';
import { JamService } from 'src/app/services/jam.service';

@Component({
  selector: 'app-single-jam-view',
  templateUrl: './single-jam-view.component.html',
  styleUrls: ['./single-jam-view.component.css']
})
export class SingleJamViewComponent implements OnInit {
  jam!: Jam; // Se inicializa con un valor por defecto para evitar errores de asignación

  constructor(
    private route: ActivatedRoute,
    private jamService: JamService,
    private router: Router
  ) {}

  ngOnInit() {
    const jamId: string | null = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la jam de los parámetros de la ruta
    if (jamId) {
      this.jamService.getJamById(jamId).subscribe(
        (data: Object) => {
          this.jam = data as Jam; // Realizar un casting explícito a tipo Jam
        },
        (error: any) => {
          console.error('Error al obtener los detalles de la jam:', error);
          // Manejar el error de acuerdo a tus necesidades (redireccionar, mostrar un mensaje de error, etc.)
        }
      );
    }
  }
}

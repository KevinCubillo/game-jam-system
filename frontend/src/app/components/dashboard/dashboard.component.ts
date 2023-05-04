import { Component } from '@angular/core';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
    
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      { data: [80000, 70000, 95000, 65000, 105000, 75000 ], label: 'Ventas', backgroundColor: '#58E08A' },
      { data: [39000, 50000, 60000, 40000, 60000, 40000], label: 'Gatos', backgroundColor: '#98A1EA' }
    ]
  };

  
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Canasta basica'], [ 'Productos de limpieza' ], 'Alimentos procesados' ],
    datasets: [ {
      data: [ 60, 15, 100 ],
      backgroundColor: [ '#F5A9A9', '#F4E067', '#71C3DB' ]
    } ]
  };

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      { data: [80000, 70000, 95000, 65000, 105000, 75000 ], label: 'Ventas', backgroundColor: '#58E08A' },
      { data: [39000, 50000, 60000, 40000, 60000, 40000], label: 'Gatos', backgroundColor: '#98A1EA' }
    ]
  };


}

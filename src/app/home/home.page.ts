import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, LogarithmicScale } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Datos numéricos
  private datos: { x: number; y: number }[] = [
    // {
    //   x: -10,
    //   y: 0,
    // },
    // {
    //   x: 0,
    //   y: 10,
    // },
    // {
    //   x: 0.5,
    //   y: 5.5,
    // },
    // {
    //   x: 10,
    //   y: 5,
    // },
  ];

  // Información del gráfico
  public lineChartData: ChartConfiguration<'scatter'>['data'] = {
    datasets: [
      {
        data: this.datos,
        label: 'Región para R < C',
        fill: true,
        borderColor: 'black',
        backgroundColor: 'rgba(56,128,255,0.3)',
        pointStyle: false,
        showLine: true,
      },
    ],
  };
  public lineChartOptions: ChartOptions<'scatter'> = {
    responsive: true,
    scales: {
      y: {
        type: 'logarithmic',
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    // Condiciones iniciales
    const valorSuperior: number = 16;
    const valorInferior: number = 1 / 4;
    const numeroDePuntos: number = 1000;
    const intervalo: number = (valorSuperior - valorInferior) / numeroDePuntos;

    let valoresRW: number[] = [];
    let valoresEbN0: number[] = [];

    for (let i = 0; i <= numeroDePuntos; i++) {
      const valor = valorInferior + intervalo * i;
      valoresRW.push(valor);
      valoresEbN0.push(10 * Math.log10((Math.pow(2, valor) - 1) / valor));
      this.datos.push({
        x: 10 * Math.log10((Math.pow(2, valor) - 1) / valor),
        y: valor,
      });
    }

    // console.table(valoresRW);
    // console.table(valoresEbN0);
    // console.table(this.datos);
  }
}

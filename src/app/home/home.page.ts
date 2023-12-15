import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, LogarithmicScale } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Datos numéricos
  private datos: { x: number; y: number }[] = [];

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
        tension: 0.5
      },
    ],
  };

  public lineChartOptions: ChartOptions<'scatter'> = {
    responsive: true,
    scales: {
      x: {
        position: { y: 1 },
        title: {
          display: true,
          align: 'end',
          text: 'Eb/N0 (dB)',
        },
        border: { width: 5 },
      },
      y: {
        type: 'logarithmic',
        position: { x: 0 },
        title: {
          display: true,
          text: 'R/W (bps/Hz)',
        },
        border: { width: 5 },
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    // Condiciones iniciales: se establece un rango para la variable R/W, 
    // ubicada sobre el eje y. Este rango se divide entre el número de puntos 
    // muestra. Con estos valores se calculará el valor del EbN0 correspondiente.
    const valorSuperiorEjeY: number = 20;
    const valorInferiorEjeY: number = 0.2;
    const numeroDePuntos: number = 99;
    const intervalo: number =
      (valorSuperiorEjeY - valorInferiorEjeY) / numeroDePuntos;

    // Se calcula el valor y el resultado se guarda en un vector con las 
    // posiciones de los ejes X y Y. 
    for (let i = 0; i <= numeroDePuntos; i++) {
      const valor = valorInferiorEjeY + intervalo * i;
      this.datos.push({
        x: 10 * Math.log10((Math.pow(2, valor) - 1) / valor),
        y: valor,
      });
    }
  }
}

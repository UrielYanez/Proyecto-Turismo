import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClimaService } from '../../services/clima.service';
=======


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  weatherData: any;
  temp?: string;
  cityName: string = ''; // Variable para la ciudad
  lat: string = ''; // Latitud
  lon: string = ''; // Longitud
  errorMessage: string = ''; // Mensaje de error

  constructor(private router: Router,
    private climaservice: ClimaService) { }

export class InicioComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadPayPalScript();
  }

  // Método para obtener el clima por ciudad
  getClimaPorCiudad() {
    if (this.cityName) {
      this.climaservice.getClimaPorCiudad(this.cityName).subscribe(
        (data: any) => {
          this.weatherData = data;
          let tempC = this.weatherData.main.temp - 273.15;
          this.temp = tempC.toFixed(2);
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'No se pudo obtener el clima de esta ciudad. Por favor verifica el nombre.';
        }
      );
    }
  }

  // Método para obtener el clima por coordenadas
  getClimaPorCoordenadas() {
    if (this.lat && this.lon) {
      this.climaservice.getClimaPorCoordenadas(this.lat, this.lon).subscribe(
        (data: any) => {
          this.weatherData = data;
          let tempC = this.weatherData.main.temp - 273.15;
          this.temp = tempC.toFixed(2);
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'No se pudo obtener el clima con esas coordenadas. Verifica que las coordenadas sean correctas.';
        }
      );
    }
  }

  loadPayPalScript() {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AfbGU_FzZLBQ5fnCz0qz8gf7-QQ6S1EBlzEhoHA0bhrm0YsnxoXBs0HtijPi9Llciyjga0Wg01-oIk7s&currency=MXN';
    script.onload = () => this.initPayPalButtons();
    document.body.appendChild(script);
  }

  initPayPalButtons() {
    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
          this.router.navigate(['/auth/paypal']);
        });
      }
    }).render('#paypal-button-container');
  }
}

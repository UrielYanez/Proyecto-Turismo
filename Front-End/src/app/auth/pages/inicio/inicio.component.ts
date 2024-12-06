import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/clima.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  city = '';
  weatherData: any = null;

  constructor(private router: Router, private weatherService: WeatherService) { }


  ngOnInit(): void {
    this.loadPayPalScript();
  }

  searchWeather() {
    if (this.city.trim()) {
      this.weatherService.getWeather(this.city).subscribe({
        next: (data: any) => {
          this.weatherData = data;
        },
        error: (error) => {
          alert('No se encontró la ciudad. Por favor, intenta de nuevo.');
        }
      });
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

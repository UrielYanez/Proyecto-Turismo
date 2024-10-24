import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { RestaurantesService } from '../../services/restaurante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
declare var mapboxgl: any;

@Component({
  selector: 'app-infores',
  templateUrl: './infores.component.html',
  styleUrl: './infores.component.css'
})
export class InforesComponent implements OnInit, AfterViewInit{
  public restaurante?: Restaurante;
  constructor(
    private restaurantesService:RestaurantesService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.restaurantesService.getRestauranteById(id) ),
      )
      .subscribe( restaurante => {
        if ( !restaurante) return this.router.navigate(['/auth/atractivos']);

        this.restaurante = restaurante;
        console.log(restaurante);
        return;
      })
  }

  ngAfterViewInit(): void {
      // Accede al token desde tu cuenta de Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9zb2FkbyIsImEiOiJja3Viam02aTN6YmRmMnBuZ2ZhMHNjMGgzIn0.pb6CX10unsJnTpWwbYQ7mg';
    
    const map = new mapboxgl.Map({
      container: 'map', // ID del contenedor del mapa
      style: 'mapbox://styles/mapbox/streets-v11', // URL del estilo
      center: [-98.3913669, 19.2088174], // Coordenadas iniciales
      zoom: 9 // Zoom inicial
    });
  }

  goBack():void{
    this.router.navigateByUrl('auth/listalugar')
  }

}

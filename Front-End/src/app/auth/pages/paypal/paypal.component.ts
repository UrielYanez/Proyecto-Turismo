import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaquetesService } from '../../../administrador/services/paquete.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paquete } from '../../interfaces/paquete.interface';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent implements OnInit {
  public hoteles: any[] = [];
  public restaurantes: any[] = [];
  public experiencias: any[] = [];
  public imagePreview: string = '';

  public paqueteForm = new FormGroup({
    nombre: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    dia: new FormControl<string>(''),
    noche: new FormControl<string>(''),
    hotel: new FormControl<string>(''),
    restaurante: new FormControl<string>(''),
    experiencia: new FormControl<string>(''),
    actividad: new FormControl<string>(''),
    costo: new FormControl<string>(''),
    alt_img: new FormControl<string>('')
  });

  constructor(
    private paquetesService: PaquetesService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  get currentPaquete(): Paquete {
    const paquete = this.paqueteForm.value as Paquete;
    return paquete;
  }

  ngOnInit(): void {
    this.paquetesService.getHoteles().subscribe(data => this.hoteles = data);
    this.paquetesService.getRestaurantes().subscribe(data => this.restaurantes = data);
    this.paquetesService.getExperiencias().subscribe(data => this.experiencias = data);

    // Suscribirse a los cambios del campo alt_img
    this.paqueteForm.get('alt_img')?.valueChanges.subscribe(url => {
      this.imagePreview = url || '';
    });
  }

  onSubmit(): void {
    if (this.paqueteForm.invalid) return;

    const confirmacion = confirm('¿Estás seguro de que deseas crear este paquete turístico?');

    if (confirmacion) {
      this.paquetesService.addPaquete(this.currentPaquete)
        .subscribe(() => {
          const snackBarRef = this.snackbar.open('¡Paquete creado exitosamente!', 'Ver Paquetes', {
            duration: 5000,
          });

          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/auth/paquetes']);
          });
        });
    }
  }

  onImageError(): void {
    this.imagePreview = 'assets/no-image.png';
  }
}

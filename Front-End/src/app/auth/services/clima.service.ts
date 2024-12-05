import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  constructor(private http: HttpClient) { }

  private key = '4abd9a4b55ac4bd201b20b87e93d967f';

  getClimaPorCiudad(ciudad: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${this.key}`);
  }

  getClimaPorCoordenadas(lat: string, lon: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}`);
  }
}
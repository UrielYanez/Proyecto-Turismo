import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {
  clientId = '789982c6d3ae44a09fea4e91ce041504';
  clientSecret = '39885d3c113b4163ad44a1781161d6df';
  token: string = '';
  searchQuery: string = '';
  tracks: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getSpotifyToken();
  }

  // Obtiene el token de acceso desde Spotify API
  async getSpotifyToken() {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),  // Corregido el uso de backticks
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', params, { headers });
      this.token = response.data.access_token;
    } catch (error) {
      console.error('Error al obtener el token de Spotify', error);
    }
  }

  // Busca canciones en Spotify
  async searchTracks() {
    const headers = {
      'Authorization': `Bearer ${this.token}`  // Corregido el uso de backticks
    };

    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${this.searchQuery}&type=track`, { headers });
      this.tracks = response.data.tracks.items;
    } catch (error) {
      console.error('Error al buscar canciones en Spotify', error);
    }
  }

  // Método para redirigir a Inicio
  irInicio() {
    // Aquí colocas tu lógica de navegación a Inicio
  }
}

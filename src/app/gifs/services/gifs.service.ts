import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = 'PK23ajdM5tN2rtnFRwkrM42NvysPezFM';

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {}

  buscarGifs( query: string ) {

    query = query.trim().toLowerCase();

    if ( !this._historial.includes(query) ) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=PK23ajdM5tN2rtnFRwkrM42NvysPezFM&q=${query}&lang=en&limit=20`)
    .subscribe(( resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
    });
    
    console.log(this._historial);
    
  }
}

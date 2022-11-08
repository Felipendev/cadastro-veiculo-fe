import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, catchError } from 'rxjs/operators';

import { Veiculo } from '../model/veiculo.model';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  API = environment.apiUrl;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getVeiculos(){
    return this.http.get<Veiculo[]>( this.API + "/veiculos").pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    return throwError(error.message || "Erro ao buscar veículos")
  }

  loadById(idVeiculo: any) {
    return this.http.get<Veiculo>(`${this.API}/${idVeiculo}`).pipe(take(1));
  }

  postVeiculos(veiculo: Veiculo){
    return this.http.post<Veiculo>(this.API, veiculo, this.httpOptions).pipe(take(1));
  }

  update(veiculo: Veiculo){
    return this.http.put<Veiculo>(`${this.API}/${veiculo.idVeiculo}`, veiculo).pipe(take(1));;
  }

  remove(idVeiculo: string) {
    return this.http.delete(`${this.API}/${idVeiculo}`).pipe(take(1));
  }
}

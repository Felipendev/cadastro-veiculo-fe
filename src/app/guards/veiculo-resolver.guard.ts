import { VeiculoService } from 'src/app/service/veiculo.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Veiculo } from '../model/veiculo.model';


@Injectable({
  providedIn: 'root'
})
export class VeiculoResolverGuard implements Resolve<Veiculo> {

  constructor(
    private service: VeiculoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    if(route.params && route.params['id']) {
     return this.service.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      sobrenome: null,
      codigo: null,
      dataRecebimento: null,
      dataEntrega: null,
      contato: null,
      statusProduto: null
    });
  }


}

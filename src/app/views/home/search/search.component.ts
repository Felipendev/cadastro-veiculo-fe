import { VeiculoService } from 'src/app/service/veiculo.service';
import { Veiculo } from 'src/app/model/veiculo.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  veiculos$!: Veiculo[];
  veiculoSelecionado!: Veiculo;

  constructor(
    private service: VeiculoService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.getVeiculos().subscribe
      (data => this.veiculos$ = data);
  }

  paginaInicial(){
    this.router.navigate(['/veiculos'])
  }

}

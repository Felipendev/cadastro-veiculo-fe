import { catchError, map, switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { empty, Subject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { VeiculoService } from 'src/app/service/veiculo.service';
import { Veiculo } from 'src/app/model/veiculo.model';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-veiculo-edit',
  templateUrl: './veiculo-edit.component.html',
  styleUrls: ['./veiculo-edit.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class VeiculoEditComponent implements OnInit {

  isShow = false;
  searchValue!: string;
  form!: FormGroup;
  submitted = false;
  error$ = new Subject<boolean>();

  veiculos$!: Observable<Veiculo[]>;
  productDialog!: boolean;
  position!: string;

  constructor(
    private fb: FormBuilder,
    private service: VeiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
    ) {  }

  ngOnInit(): void {

    this.route.params
    .pipe(
      map((params: any) => params['idVeiculo']),
      switchMap(idVeiculo => this.service.loadById(idVeiculo))
      ).subscribe(veiculo => this.updateForm(veiculo));

    const veiculo = this.route.snapshot.data['veiculo'];

    this.form = this.fb.group({
      idVeiculo: [veiculo.idVeiculo],
      nomeVeiculo: [veiculo.nomeVeiculo],
      marca: [veiculo.marca],
      ano: [veiculo.ano],
      cor: [veiculo.cor],
      descricao: [veiculo.descricao],
      vendido: [veiculo.vendido]
    });
    this.onRefresh();
  }

  updateForm(veiculo: Veiculo) {
    this.form.patchValue({
      idVeiculo: veiculo.idVeiculo,
      nomeVeiculo: veiculo.nomeVeiculo,
      marca: veiculo.marca,
      ano: veiculo.ano,
      cor: veiculo.cor,
      descricao: veiculo.descricao,
      vendido: veiculo.vendido
    })
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  editaVeiculo(){
    this.submitted = true;
    if(this.form.valid) {
      console.log('submit');
      console.log(this.form.value)
      if(this.form.value.idVeiculo) {
        this.service.update(this.form.value).subscribe(
          success => {
            this.messageService.add({severity:'success', summary:'Tudo certo!', detail:'Veículo atualizado com sucesso!'});
            setTimeout(function(){

              window.location.href = "/veiculos";

        }, 500);

          },
          error => this.messageService.add({severity:'error', summary:'Rejected', detail:'Error ao atualizar veículo, tente novamente!'}),
          () => console.log('update completo')
        );
      }
    }
  }

  onRefresh() {
    this.veiculos$ = this.service.getVeiculos()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        this.handleError()
        return empty();
      })
    );
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  handleError() {
    this.messageService.add({severity:'error', summary:'Rejected', detail:'Erro ao carregar veículos. Tente novamente mais tarde'});
  }

  paginaInicial(){
    this.router.navigate(['/veiculos'])
  }

  marcas = ['','VOLVO', 'VOLKSWAGEN', 'TROLLER', 'TOYOTA', 'TAC',
  'SUZUKI','SUBARU','SSANGYONG','SHINERAY', 'SEAT', 'ROLLS_ROYCE', 'RENAULT', 'RELY', 'RAM', 'PORSCHE',
   'PEUGEOT', 'NISSAN', 'MORRIS_GARAGES', 'MITSUBISHI', 'MINI', 'MERCEDES_BENZ',
   'MCLAREN', 'AUDI', 'BMW', 'CHEVROLET', 'CITROEN', 'CROSS_LANDER',
   'DODGE', 'FERRARI', 'FIAT', 'FORD', 'HONDA', 'HYUNDAI', 'IVECO', 'JAC', 'JEEP', 'KIA', 'LAMBORGHINI',
   'LAND_ROVER']
}

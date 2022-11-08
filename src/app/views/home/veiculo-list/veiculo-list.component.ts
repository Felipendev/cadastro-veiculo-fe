import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Veiculo } from 'src/app/model/veiculo.model';
import { VeiculoService } from 'src/app/service/veiculo.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class VeiculoListComponent implements OnInit {

  @Input() type = "recebido";
  veiculos$!: Veiculo[];
  veiculo!: Veiculo;
  veiculoSelecionado!: Veiculo;
  selectedVeiculos!: Veiculo[];
  position!: string;
  productDialog!: boolean;
  submitted!: boolean;
  form!: FormGroup;
  error!:String;

  constructor(
    private veiculoService: VeiculoService,
    private fb: FormBuilder,
    private router: Router,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.veiculoService.getVeiculos().subscribe((data) => {
      this.veiculos$ = data
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Falha', detail:'Falha ao buscar veículos. Tente novamente mais tarde ou entre em contato com a equipe de desenvolvimento', life: 10000})});

    const veiculo = this.route.snapshot.data['veiculo'];

    this.form = this.fb.group({
      idVeiculo: [veiculo.idVeiculo],
      nomeVeiculo: [veiculo.nomeVeiculo, [this.validarObrigatoriedade, Validators.minLength(2), Validators.maxLength(50)]],
      marca: [veiculo.marca, [this.validarObrigatoriedade, Validators.minLength(2), Validators.maxLength(50)]],
      ano: [ veiculo.ano, this.validarObrigatoriedade],
      cor: [veiculo.cor, [this.validarObrigatoriedade, Validators.minLength(2)]],
      descricao: [veiculo.descricao],
      vendido: [veiculo.vendido]
    });
    // this.onRefresh();
  }

openNew() {
  this.submitted = false;
  this.productDialog = true;
}

validarObrigatoriedade(input: FormControl) {
  return (input.value ? null : { obrigatoriedade: true });
}

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.onRefresh();
}

  onRefresh() {
    location.assign("/veiculos");
  }

  onEdit(idVeiculo: String) {
    this.productDialog = true;
    this.router.navigate(['/veiculos/editar', idVeiculo], {relativeTo: this.route});
  }

  onDelete(veiculo: Veiculo) {
    this.veiculoSelecionado = veiculo;
    this.confirmationService.confirm({
      message: 'Tem certeza que quer excluir ' + veiculo.nomeVeiculo + '?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.veiculoService.remove(this.veiculoSelecionado.idVeiculo).subscribe();
          this.veiculos$ = this.veiculos$.filter(val => val.idVeiculo !== veiculo.idVeiculo);
          this.messageService.add({severity:'success', summary:'Confirmado', detail:'Veículo excluido', life: 3000});
    },
  });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.veiculos$ = this.veiculos$.filter(val => !this.selectedVeiculos.includes(val));
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

criaVeiculo(){
  this.submitted = true;
  if(this.form.valid) {
    console.log('submit');
    console.log(this.form.value)
    if(this.form.value.idVeiculo) {
      this.veiculoService.update(this.form.value).subscribe(
        success => {
          this.messageService.add({severity:'success', summary:'Tudo certo!', detail:'Veículo atualizado com sucesso!'});
          this.productDialog = false;
        },
        error => this.messageService.add({severity:'error', summary:'Rejected', detail:'Error ao atualizar veículo, tente novamente!'}),
        () => console.log('update completo')
      );
    } else {
      this.veiculoService.postVeiculos(this.form.value).subscribe(
        success => {
          this.messageService.add({severity:'success', summary:'Tudo certo!', detail:'Veículo criado com sucesso!'});
        },
        error => this.messageService.add({severity:'error', summary:'Ops', detail:'Error ao criar veículo, tente novamente!'}),
        () => console.log('request completo')
      );
    }
  }
  this.veiculos$ = [...this.veiculos$];
}

cancelar(){
  this.submitted = false;
  this.form.reset();
}


hasError(field: string) {
  return this.form.get(field)?.errors;
}

  mudaStatus(veiculo: Veiculo) {
  this.veiculoSelecionado = veiculo;

  }

  handleError() {
    this.messageService.add({severity:'error', summary:'Falha', detail:'Falha ao buscar veiculos. Tente novamente mais tarde'});
  }

  marcas = ['', 'VOLVO', 'VOLKSWAGEN', 'TROLLER', 'TOYOTA', 'TAC',
  'SUZUKI','SUBARU','SSANGYONG','SHINERAY', 'SEAT', 'ROLLS_ROYCE', 'RENAULT', 'RELY', 'RAM', 'PORSCHE',
   'PEUGEOT', 'NISSAN', 'MORRIS_GARAGES', 'MITSUBISHI', 'MINI', 'MERCEDES_BENZ',
   'MCLAREN', 'AUDI', 'BMW', 'CHEVROLET', 'CITROEN', 'CROSS_LANDER',
   'DODGE', 'FERRARI', 'FIAT', 'FORD', 'HONDA', 'HYUNDAI', 'IVECO', 'JAC', 'JEEP', 'KIA', 'LAMBORGHINI',
   'LAND_ROVER']
}

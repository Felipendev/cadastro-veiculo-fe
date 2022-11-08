import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VeiculoListComponent } from '../veiculo-list/veiculo-list.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home.component';
import { SearchComponent } from '../search/search.component';
import { VeiculoEditComponent } from '../veiculo-edit/veiculo-edit.component';
import { MenuComponent } from '../menu/menu.component';
import { ErrorsModule } from 'src/app/errors/errors.module';

import { TabViewModule } from 'primeng/tabview';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import {TooltipModule} from 'primeng/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToolbarModule} from 'primeng/toolbar';



@NgModule({
  declarations: [
    HeaderComponent,
    VeiculoListComponent,
    HomeComponent,
    SearchComponent,
    MenuComponent,
    VeiculoEditComponent
  ],
  exports:[
      HomeComponent,
  ],
  entryComponents: [
    VeiculoListComponent
],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ErrorsModule,
    HttpClientModule,
    TabViewModule,
    TabMenuModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    InputNumberModule,
    InputTextareaModule,
    TooltipModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    DynamicDialogModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToolbarModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ItemsRegisterComponent } from './pages/items-register/items-register.component';
import { TableItemsComponent } from './components/table-items/table-items.component';
import { FormComponent } from './components/form/form.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    ItemsListComponent,
    ItemsRegisterComponent,
    TableItemsComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

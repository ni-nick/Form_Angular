import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
})
export class SidebarMenuComponent implements OnInit {
  itemsMenu: MenuItem[] = [];

  ngOnInit() {
    this.itemsMenu = [
      {
        label: 'Cadastrar',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/Cadastrar',
      },
      {
        label: 'Listar',
        icon: 'pi pi-fw pi-list',
        routerLink: '/Listar',
      },
    ];
  }
}

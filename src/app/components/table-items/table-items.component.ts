import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-items',
  templateUrl: './table-items.component.html',
  styleUrls: ['./table-items.component.css'],
})
export class TableItemsComponent implements OnInit {
  records = [];

  ngOnInit() {
    const recordsLocalStorage = localStorage.getItem('registros');
    const convertToObject = recordsLocalStorage
      ? JSON.parse(recordsLocalStorage)
      : [];
    this.records = convertToObject;
    console.log(this.records);
  }
}

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-table-items',
  templateUrl: './table-items.component.html',
  styleUrls: ['./table-items.component.css'],
})
export class TableItemsComponent implements OnInit {
  records: any[] = [];

  ngOnInit() {
    const recordsLocalStorage = localStorage.getItem('registros');
    let convertToObject = recordsLocalStorage
      ? JSON.parse(recordsLocalStorage)
      : [];

    convertToObject = this.convertToString(convertToObject);

    convertToObject = convertToObject.filter((item: any) => !item.deleteDate);
    console.log(convertToObject)
    this.records = convertToObject;
    console.log(convertToObject);
  }

  public deleteItem(item: any ){
    item.deleteDate = moment(new Date()).format('DD/MM/YYYY');
    const localstorage = localStorage.getItem('registros');
    const itemsFromLocalStorage = localstorage ? JSON.parse(localstorage) : [];

    let updatedItems = itemsFromLocalStorage.map((existingItem: any) => {
      if (existingItem.id === item.id) {
        return item;
      }
      return existingItem;
    });

    localStorage.setItem('registros', JSON.stringify(updatedItems));

    updatedItems = this.convertToString(updatedItems);
    this.records = updatedItems.filter((item: any) => !item.deleteDate);
  }

  public convertToString(convertToObject: any){
    convertToObject = convertToObject.map((element: any) => {
      if (element.perishableProduct === false) {
        return {
          ...element,
          isPerishableProduct: "Não",
        };
      }

      return {
        ...element,
        isPerishableProduct: "Sim",
      };
    });

    return convertToObject;
  }
}

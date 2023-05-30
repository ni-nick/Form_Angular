import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api'
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

import { configurationLocale } from 'src/assets/configurationLocale';

interface UnitOfMeasurementOptions {
    name: string;
    value: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

export class FormComponent implements OnInit{
  form: FormGroup;
  unitsOfMeasurementOption: UnitOfMeasurementOptions[] = [];
  urlId: number = 0;
  productOutOfDate: boolean = false;
  manufacturingDateInvalid: boolean = false;

  id: number = 0;
  itemName: string = '';
  unitOfMeasurement: { name: string, value: string } = { name: '', value: '' };
  quantity: number = 0;
  price: number = 0;
  perishableProduct: boolean = false;
  expirationDate: string = '';
  manufacturingDate: string = '';
  deleteDate : string = '';

  public ngOnInit() {
    configurationLocale(this.primengConfig)

    this.unitsOfMeasurementOption = [
      { name: 'Litro', value: 'lt' },
      { name: 'Quilograma', value: 'kg' },
      { name: 'Unidade', value: 'uni' },
    ];
  }

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.form = this.formBuilder.group({
      id:[''],
      itemName: ['', Validators.required],
      unitOfMeasurement: ['', Validators.required],
      quantity: [''],
      price: ['', Validators.required],
      perishableProduct: [false, Validators.required],
      expirationDate: ['', Validators.required],
      manufacturingDate: ['', Validators.required],
    });

    this.form.get('perishableProduct')?.valueChanges.subscribe((value) => {
      this.perishableProduct = value;

      if (this.perishableProduct) { // Defina a validação obrigatória para a data de validade com base no valor do campo "produto perecível"
        this.form.get('expirationDate')?.setValidators(Validators.required);
      } else {
        this.form.get('expirationDate')?.clearValidators();
      }
      this.form.get('expirationDate')?.updateValueAndValidity();
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.urlId = id;
      this.loadItemDataEdit(id);
    });
  }

  public loadItemDataEdit(id: any) {
    const itenslocalStorage = localStorage.getItem('registros');
    const convertToJson = itenslocalStorage ? JSON.parse(itenslocalStorage) : [];
    const selectedItem = convertToJson.find((item: any) => item.id === parseInt(id, 10));

    if (selectedItem) {
      this.unitOfMeasurement = { name: selectedItem.unitOfMeasurement.name, value: selectedItem.unitOfMeasurement.value };
      this.form.patchValue({
        id: selectedItem.id,
        itemName: selectedItem.itemName,
        quantity: selectedItem.quantity,
        price: selectedItem.price,
        perishableProduct: selectedItem.perishableProduct,
        expirationDate: selectedItem.expirationDate,
        manufacturingDate: selectedItem.manufacturingDate,
        deleteDate: selectedItem.deleteDate
      });
    }
  }

  public saveForm() {
    if (this.manufacturingDateInvalid) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Data de fabricação inválida!', life: 2000, closable: true });
      return;
    }

    if(this.form.valid){
      const data = this.form.value;
      const existingData = localStorage.getItem('registros');
      const records = existingData ? JSON.parse(existingData) : [];

       if(this.urlId){
        const existingItemIndex = records.findIndex((item: any) => item.id === data.id);
        data.deleteDate = '';

        records[existingItemIndex] = data;
        localStorage.setItem('registros', JSON.stringify(records));
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro editado com sucesso!', life: 2000, closable: true });

      }else{
        let count = localStorage.getItem('contador');
        if (!count) {
          count = '0';
        }

        const newCount = parseInt(count) + 1;
        data.id = newCount;
        data.expirationDate = moment(data.expirationDate).format("DD/MM/YYYY");
        data.manufacturingDate = moment(data.manufacturingDate).format("DD/MM/YYYY");
        data.deleteDate = '';

        records.push(data);
        localStorage.setItem('registros', JSON.stringify(records));
        localStorage.setItem('contador', JSON.stringify(newCount));
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro adicionado com sucesso!', life: 2000, closable: true });

        setTimeout(() => {
          this.form.reset();
        }, 1000);
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

  public onDateSelect() {
    const selectedDate = moment(this.form.get('expirationDate')?.value).startOf("day");
    const currentDate = moment();
    this.productOutOfDate = selectedDate.isBefore(currentDate);


    if (this.form.get('perishableProduct')?.value && this.form.get('expirationDate')?.value) {
      const manufacturingDate = moment(this.form.get('manufacturingDate')?.value).startOf("day");
      const expirationDate = moment(this.form.get('expirationDate')?.value).startOf("day");

      if (manufacturingDate.isValid() && expirationDate.isValid()) {
        if (manufacturingDate.isAfter(expirationDate)) {
          this.manufacturingDateInvalid = true;
        } else {
          this.manufacturingDateInvalid = false;
        }
      }
    }else{
      this.manufacturingDateInvalid = false;
    }
  }
}

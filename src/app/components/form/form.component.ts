import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl,ValidationErrors} from '@angular/forms';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

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
  @ViewChild('unitOfMeasurementFormInput', { static: false })
  unitOfMeasurementFormInput!: ElementRef;

  form: FormGroup;
  unitsOfMeasurementOption: UnitOfMeasurementOptions[] = [];

  urlId: number = 0;

  id: number = 0;
  itemName: string = '';
  unitOfMeasurement: { name: string, value: string } = { name: '', value: '' };
  quantity: number = 0;
  price: number = 0;
  perishableProduct: boolean = false;
  expirationDate: string = '';
  manufacturingDate: string = '';
  deleteDate : string = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private messageService: MessageService) {
    this.form = this.formBuilder.group({
      id:[''],
      itemName: ['', Validators.required],
      unitOfMeasurement: ['', Validators.required],
      quantity: [''],
      price: ['', Validators.required],
      perishableProduct: [false, Validators.required],
      expirationDate: ['', validatorExpirationDate],
      manufacturingDate: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      const id = params['id']; // Obtém o ID da URL
      this.urlId = id;
      this.loadItemData(id);
    });
  }

  ngOnInit() {
    this.unitsOfMeasurementOption = [
      { name: 'Litro', value: 'lt' },
      { name: 'Quilograma', value: 'kg' },
      { name: 'Unidade', value: 'uni' },
    ];
  }

  public loadItemData(id: any) {
    const itenslocalStorage = localStorage.getItem('registros');
    const convertToJson = itenslocalStorage ? JSON.parse(itenslocalStorage) : [];
    const selectedItem = convertToJson.find((item: any) => item.id === parseInt(id, 10));

    if (selectedItem) {
      this.id = selectedItem.id;
      this.itemName = selectedItem.itemName;
      this.unitOfMeasurement = { name: selectedItem.unitOfMeasurement.name, value: selectedItem.unitOfMeasurement.value };
      this.quantity = selectedItem.quantity;
      this.price = selectedItem.price;
      this.perishableProduct = selectedItem.perishableProduct;
      this.expirationDate = selectedItem.expirationDate;
      this.manufacturingDate = selectedItem.manufacturingDate;
      this.deleteDate = selectedItem.deleteDate;
    }
  }

  // public formatarNumero() {
  //   this.quantity = Number(this.quantity.toFixed(3)); // Defina o número de casas decimais desejado

  //   console.log(this.quantity)
  // }

  public saveForm() {
    if(this.form.valid){
      const data = this.form.value;
      const existingData = localStorage.getItem('registros');
      const records = existingData ? JSON.parse(existingData) : [];

      if(this.urlId){
        console.log(data)
        const existingItemIndex = records.findIndex((item: any) => item.id === data.id);
        console.log(existingItemIndex)

        records[existingItemIndex] = data;
        localStorage.setItem('registros', JSON.stringify(records));
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro editado com sucesso!' });
      }else{
        let count = localStorage.getItem('contador');
        if (!count) {
          count = '0';
        }

        const newCount = parseInt(count) + 1;

        data.id = newCount;
        data.expirationDate = moment(data.expirationDate).format("DD/MM/YYYY")
        data.manufacturingDate = moment(data.manufacturingDate).format("DD/MM/YYYY")
        data.deleteDate = '';

        records.push(data);

        localStorage.setItem('registros', JSON.stringify(records));
        localStorage.setItem('contador', JSON.stringify(newCount));
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro adicionado com sucesso!' });
        this.form.reset();
      }
    } else {
      // verifica se os campos obrigatórios estão preenchidos
      this.form.markAllAsTouched();
    }
  }

}

export function validatorExpirationDate(
  control: AbstractControl
): ValidationErrors | null {
  const perishableProduct = control.get('perishableProduct')?.value;
  const expirationDate = control.get('expirationDate')?.value;

  if (perishableProduct && !expirationDate) {
    return { required: true };
  }

  return null;
}

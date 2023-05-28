import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators,
AbstractControl,ValidationErrors} from '@angular/forms';
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
  form: FormGroup;
  unitsOfMeasurement: UnitOfMeasurementOptions[] = [];

  ngOnInit() {
      this.unitsOfMeasurement = [
        { name: 'Litro', value: 'lt' },
        { name: 'Quilograma', value: 'kg' },
        { name: 'Unidade', value: 'uni' },
    ];
  }

  constructor(private formBuilder: FormBuilder) {
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
  }

  public saveForm() {
    if (this.form.valid) {
      const data = this.form.value;

      let count = localStorage.getItem('contador');
      const existingData = localStorage.getItem('registros');
      const records = existingData ? JSON.parse(existingData) : [];

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
      this.form.reset();
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

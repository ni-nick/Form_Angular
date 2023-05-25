import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      itemName: ['', Validators.required],
      unitOfMeasurement: ['', Validators.required],
      quantity: [''],
      price: ['', Validators.required],
      perishableProduct: [false, Validators.required],
      expirationDate: ['', validatorExpirationDate],
      manufacturingDate: ['', Validators.required],
    });
  }

  saveForm() {
    if (this.form.valid) {
      const values = this.form.value;
      console.log(values);
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

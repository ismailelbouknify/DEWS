import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',

})
export class TemplateDrivenFormComponent {
  userDetails = {
    name: '',
    email: '',
    address: '',
    mobile: '',
    age: null,
    gender: ''
  };

  submitForm(form: any): void {
    if (form.valid) {
      console.log('Form data:', this.userDetails);
    }
  }
}
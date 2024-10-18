

import {AbstractControl, ValidationErrors, ValidatorFn, FormGroup} from '@angular/forms';


export class ValidatorCustom {

    static validators = {
        jsonValidator: _jsonValidator,
        mustMatch : _mustMatch
      }

     

}

export function _jsonValidator(control: AbstractControl): ValidationErrors | null {
    if(typeof control.value !== 'object') 
        return { jsonValidator: false };


    return null;
};


export function _mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
  
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
  
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
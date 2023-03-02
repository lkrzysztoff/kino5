import { AbstractControl, FormGroup } from '@angular/forms';

export function whitespaceValidator(control: AbstractControl) {
  const whitespaceRegex = /\s/g;
  const isValid = !whitespaceRegex.test(control.value);
  return isValid ? null : { whitespace: true };
}

export function emailValidator(control: AbstractControl) {
  const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = emailRegex.test(control.value);
  return isValid ? null : { email: true };
}
  export function emailMatchValidate(form:FormGroup)  {
    const email = form.get('mail')?.value;
    const confirm = form.get('emailConfirm')?.value;
    return email === confirm ? null : {confirm:true}
  }

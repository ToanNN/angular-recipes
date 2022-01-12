import { AbstractControl, ValidatorFn } from "@angular/forms";



export function emailMatcher(parentControl: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = parentControl.get('email');
  const confirmEmail = parentControl.get('confirmEmail');

  if (!emailControl || !confirmEmail) {
    return null;
  }

  if (emailControl.pristine && confirmEmail.pristine) {
    return null;
  }

  if (emailControl.value === confirmEmail.value) {
    return null;
  }

  return { unmatched: true };
}

export function ratingRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && (isNaN(control.value) || control.value < min || control.value > max)) {
      return {
        outOfRange: true
      }
    }

    return null;
  }
}

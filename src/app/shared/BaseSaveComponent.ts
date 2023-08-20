import { Directive } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { take } from 'rxjs';

@Directive()
export abstract class BaseSaveComponent {
  constructor() {}

  abstract loading: boolean;
  abstract form: FormGroup;
  abstract submitForm(): Promise<void>;

  error(controlName: string) {
    const control = this.form?.get(controlName);
    const result = control?.invalid && control?.errors && (control?.dirty || control?.touched);
    return result ? control : undefined;
  }

  protected async isValid(): Promise<boolean> {
    await new Promise<boolean>((resolve) => {
      if (this.form.pending) {
        this.form.statusChanges.pipe(take(1)).subscribe(() => resolve(this.form.valid));
      } else {
        resolve(true);
      }
    });

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('FORM ERROR:', this.getInvalidControls());
      return false;
    }

    return true;
  }

  private getInvalidControls() {
    const invalid: { name: string; value: any; error: ValidationErrors | null }[] = [];
    const controls = this.form.controls;

    for (const name in controls) {
      const control = controls[name];
      if (control.invalid) invalid.push({ name, value: control.value, error: control.errors });
    }

    return invalid;
  }
}

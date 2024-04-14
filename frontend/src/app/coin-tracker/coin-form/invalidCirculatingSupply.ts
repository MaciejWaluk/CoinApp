import { FormControl, ValidationErrors } from '@angular/forms';

export function circulatingSupplyValidator(
  control: FormControl
): ValidationErrors | null {
  const coinForm = control.parent;
  if (coinForm) {
    const circulatingSupply = coinForm.get('coinCirulatingSupply')?.value;
    const totalSupply = coinForm.get('coinTotalSupply')?.value;
    if (
      circulatingSupply !== null &&
      totalSupply !== null &&
      circulatingSupply > totalSupply
    ) {
      return { invalidCirculatingSupply: true };
    }
  }
  return null;
}

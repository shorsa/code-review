import { FormArray, FormGroup } from '@angular/forms';

export function getDateTimeWithCurrentTimezone(
  date?: string | null,
  isDateObject: boolean = false
): Date | string | undefined {
  if (!date) return;
  const selectedDate = new Date(date);
  const timezoneOffset = selectedDate.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(selectedDate.getTime() - timezoneOffset);
  if (isDateObject) return localDate;
  const formattedDate = localDate.toISOString();
  return formattedDate;
}

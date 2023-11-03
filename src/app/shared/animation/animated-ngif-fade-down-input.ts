//Vendors
import { animate, trigger, transition, style } from '@angular/animations';

export const fadeDownInput = trigger('fadeDownInput', [
  transition(':enter', [
    style({
      opacity: 0,
      height: 0,
    }),
    animate(
      '400ms',
      style({
        opacity: 1,
        height: '67px',
      })
    ),
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      height: '67px',
    }),
    animate(
      '400ms',
      style({
        opacity: 0,
        height: 0,
      })
    ),
  ]),
]);

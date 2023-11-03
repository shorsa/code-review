//Vendors
import { animate, trigger, transition, style } from '@angular/animations';

export const fadeLeftButton = trigger('fadeLeftButton', [
  transition(':enter', [
    style({
      opacity: 0,
      width: 0,
      paddingLeft: 0,
      paddingRight: 0,
    }),
    animate(
      '400ms',
      style({
        opacity: 1,
        width: 'auto',
        paddingLeft: '15px',
        paddingRight: '15px',
      })
    ),
  ]),

  transition(':leave', [
    style({
      paddingLeft: '15px',
      paddingReft: '15px',
      opacity: 1,
      width: 'auto',
    }),
    animate(
      '400ms',
      style({
        opacity: 0,
        width: 0,
      })
    ),
  ]),
]);

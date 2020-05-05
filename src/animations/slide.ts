import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ],{ optional: true }),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ right: '100%'}))
        ],{ optional: true }),
        query(':enter', [
          animate('600ms ease-in', style({ right: '0%'}))
        ],{ optional: true })
      ]),
      query(':enter', animateChild()),
    ])
  ]);
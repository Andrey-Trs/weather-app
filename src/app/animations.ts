import { trigger, state, transition, style, animate, query } from '@angular/animations';

// toggle button
export let toggle = trigger('changePosition', [
    state('base', style({
      margin: '0px'
    })),
    state('right', style({
      'margin-left': '28px'
    })),
    transition('base => right', animate('300ms')),
    transition('right => base', animate('300ms'))
  ]);

// logo animation

export let show = trigger('showLogo', [
    transition(':enter', [
      query('h3', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('.6s')
      ])
    ])
  ]);

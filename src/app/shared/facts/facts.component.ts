import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Observable,
  delay,
  interval,
  map,
  of,
  startWith,
  switchMap
} from 'rxjs';
import { TranslocoModule } from '@ngneat/transloco';
import { animate, style, transition, trigger } from '@angular/animations';

interface Fact {
  key: string;
  data?: Observable<Record<string, string | number>>;
}

@Component({
  selector: 'app-facts',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './facts.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, marginTop: '-3rem' }),
        animate(500, style({ opacity: 1, marginTop: 0 }))
      ]),
      transition(':leave', [
        style({ opacity: 1, marginTop: 0 }),
        animate(500, style({ opacity: 0, marginTop: '3rem' }))
      ])
    ])
  ]
})
export class FactsComponent {
  @HostBinding('class') public readonly classes =
    /*tw*/ 'flex place-content-center place-items-center';
  private timeUntilChristmas$ = interval(1000).pipe(
    map(() => {
      const now = new Date();
      const christmas = new Date(now.getFullYear(), 11, 24);
      if (now.getMonth() === 11 && now.getDate() > 24) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      const diff = christmas.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return {
        days,
        hours,
        minutes,
        seconds
      };
    })
  );
  public facts: Fact[] = [
    { key: 'FACT.12', data: this.timeUntilChristmas$ },
    { key: 'FACT.0' },
    { key: 'FACT.1' },
    { key: 'FACT.2' },
    { key: 'FACT.3' },
    { key: 'FACT.4' },
    { key: 'FACT.5' },
    { key: 'FACT.6' },
    { key: 'FACT.7' },
    { key: 'FACT.8' },
    { key: 'FACT.9' },
    { key: 'FACT.10' },
    { key: 'FACT.11' }
  ];
  public fact$ = interval(7500).pipe(
    switchMap(() =>
      of(this.facts[Math.floor(Math.random() * this.facts.length)]).pipe(
        delay(500),
        startWith(null)
      )
    ),
    startWith(this.facts[0])
  );
}

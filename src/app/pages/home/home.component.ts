import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from 'src/app/shared/hero/hero.component';
import { SnowfallComponent } from 'src/app/shared/snowfall/snowfall.component';
import { NamePickerStoreModule } from 'src/app/stores/name-picker/name-picker.module';
import { Store } from '@ngrx/store';
import { namePickerFeature } from 'src/app/stores/name-picker/name-picker.state';
import namePickerActions from 'src/app/stores/name-picker/name-picker.actions';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  firstValueFrom,
  interval,
  map,
  startWith
} from 'rxjs';
import { FactsComponent } from 'src/app/shared/facts/facts.component';
import { TranslocoModule } from '@ngneat/transloco';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';
import { GiftBoxComponent } from 'src/app/shared/gift-box/gift-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    SnowfallComponent,
    NamePickerStoreModule,
    FactsComponent,
    TranslocoModule,
    GiftBoxComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(200, style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeInStaggered', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(50, [animate('200ms ease-in', style({ opacity: 1 }))])
        ])
      ]),
      transition(':leave', [
        query(':leave', [
          style({ opacity: 1 }),
          stagger(50, [animate('200ms ease-out', style({ opacity: 0 }))])
        ])
      ])
    ]),
    trigger('fallFadeIn', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-3rem)' }),
          stagger(50, [
            animate(
              '200ms ease-in',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ])
      ]),
      transition(':leave', [
        query(':leave', [
          style({ opacity: 1, transform: 'translateY(0)' }),
          stagger(50, [
            animate(
              '200ms ease-out',
              style({ opacity: 0, transform: 'translateY(3rem)' })
            )
          ])
        ])
      ])
    ])
  ]
})
export class HomeComponent {
  public store = inject(Store);
  private static readonly loadingLabels = [
    'LOADING.1',
    'LOADING.2',
    'LOADING.3',
    'LOADING.4'
  ];
  public keepShowingLoading$ = new BehaviorSubject(true);
  public loadingLabels$ = interval(1500).pipe(
    map(
      (count) =>
        HomeComponent.loadingLabels[
          (count + 1) % HomeComponent.loadingLabels.length
        ]
    ),
    startWith(HomeComponent.loadingLabels[0])
  );
  public isLoading$ = this.store.select(namePickerFeature.selectLoading);
  public isLoadingState$ = combineLatest([
    this.isLoading$,
    this.keepShowingLoading$
  ]).pipe(
    map(
      ([isLoadingState, keepShowingLoading]) =>
        isLoadingState || keepShowingLoading
    )
  );
  public isErrorState$ = this.store.select(namePickerFeature.selectError);
  public isPickUserState$ = this.store.select(
    namePickerFeature.isPickUserState
  );
  public isPickNameState$ = this.store
    .select(namePickerFeature.isPickNameState)
    .pipe(delay(1000));
  public isDoneState$ = this.store.select(namePickerFeature.isDoneState);
  public user$ = this.store.select(namePickerFeature.selectUser);
  public users$ = this.store.select(namePickerFeature.selectUsers);
  public gift$ = this.store.select(namePickerFeature.selectGift);
  public names$ = this.store.select(namePickerFeature.selectAvailableNames);
  public availableNames$ = this.store.select(
    namePickerFeature.selectAvailableNames
  );
  public pickedName$ = this.store.select(namePickerFeature.selectPickedName);
  public pickedNameGift$ = this.store.select(
    namePickerFeature.selectPickedNameGift
  );

  public setUser = (user: string) =>
    this.store.dispatch(namePickerActions.pickUser({ user }));
  public pickName = async (name: string) => {
    const user = await firstValueFrom(
      this.store.select(namePickerFeature.selectUser)
    );
    if (!user) {
      return;
    }
    this.store.dispatch(namePickerActions.pickName({ name, user }));
  };
  public setGift = async (user: string, gift: string) => {
    this.store.dispatch(namePickerActions.setGift({ user, gift }));
  };
  public hideLoading = () => this.keepShowingLoading$.next(false);

  public colors = [
    'crimson',
    'cyan',
    'mintcream',
    'hotpink',
    'goldenrod',
    'indigo',
    'ivory'
  ];

  private init = this.store.dispatch(namePickerActions.loadState());
}

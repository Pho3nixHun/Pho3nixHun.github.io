import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import NamePickerActions from './name-picker.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { NamePickerData } from './interfaces/name-picker.backend.interface';

const url = 'https://api.jsonbin.io/v3/b/6160da3caa02be1d4456c67c/';
const headers = {
  'X-Master-Key':
    '$2b$10$KjA6bzM7uur9YFhXy99TUO9CTPHcHTGmhWx8h89B1OHt0uavJT2iW',
  'X-BIN-META': 'false',
  'Content-Type': 'application/json'
};

const fetchData$ = (http: HttpClient) =>
  http.get<NamePickerData>(url, {
    headers
  });
const setData$ = (http: HttpClient, data: NamePickerData) =>
  http.put<{ record: NamePickerData }>(url, data, {
    headers
  });

export const getNamePickerData$ = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(NamePickerActions.loadState),
      switchMap(() =>
        fetchData$(http).pipe(
          map((data) => NamePickerActions.loadStateSuccess({ data: data })),
          catchError((error) =>
            of(NamePickerActions.loadStateFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const pickName$ = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(NamePickerActions.pickName),
      withLatestFrom(fetchData$(http)),
      switchMap(([{ name, user }, data]) => {
        const alreadyPicked = Object.keys(data.taken).includes(name);
        if (alreadyPicked) {
          return of(
            NamePickerActions.pickNameFailure({
              error: new Error('Already picked')
            })
          );
        }
        return setData$(http, {
          ...data,
          taken: { ...data.taken, [name]: user }
        }).pipe(
          map(({ record }) =>
            NamePickerActions.pickNameSuccess({ data: record })
          ),
          catchError((error) =>
            of(NamePickerActions.pickNameFailure({ error }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const setGift$ = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(NamePickerActions.setGift),
      switchMap(({ user, gift }) =>
        fetchData$(http).pipe(
          switchMap((data) =>
            setData$(http, {
              ...data,
              gifts: { ...data.gifts, [user]: gift }
            }).pipe(
              map(({ record }) =>
                NamePickerActions.setGiftSuccess({ data: record })
              ),
              catchError((error) =>
                of(NamePickerActions.setGiftFailure({ error }))
              )
            )
          ),
          map(() => NamePickerActions.loadState()),
          catchError((error) => of(NamePickerActions.setGiftFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

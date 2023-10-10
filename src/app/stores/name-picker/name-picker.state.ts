import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store';
import { NamePickerState } from './interfaces/state.interface';
import namePickerActions from './name-picker.actions';

const initialState: NamePickerState = {
  user: null,
  loading: false,
  error: null,
  data: null
};

export const reducer: ActionReducer<NamePickerState> = createReducer(
  initialState,
  on(
    namePickerActions.loadState,
    (state): NamePickerState => ({
      ...state,
      loading: true
    })
  ),
  on(
    namePickerActions.loadStateFailure,
    (state, { error }): NamePickerState => ({
      ...state,
      error,
      loading: false
    })
  ),
  on(
    namePickerActions.loadStateSuccess,
    (state, { data }): NamePickerState => ({
      ...state,
      loading: false,
      data
    })
  ),
  on(
    namePickerActions.pickUser,
    (state, { user }): NamePickerState => ({
      ...state,
      user
    })
  ),
  on(
    namePickerActions.pickNameSuccess,
    (state, { data }): NamePickerState => ({
      ...state,
      data
    })
  ),
  on(
    namePickerActions.pickNameFailure,
    (state, { error }): NamePickerState => ({
      ...state,
      error
    })
  ),
  on(
    namePickerActions.setGiftSuccess,
    (state, { data }): NamePickerState => ({
      ...state,
      data
    })
  ),
  on(
    namePickerActions.setGiftFailure,
    (state, { error }): NamePickerState => ({
      ...state,
      error
    })
  )
);

export const namePickerFeature = createFeature({
  name: 'NamePicker',
  reducer,
  extraSelectors: ({ selectData, selectUser }) => {
    const selectUsers = createSelector(
      selectData,
      (data) => data && Object.keys(data.names)
    );
    const selectPickedName = createSelector(
      selectData,
      selectUser,
      (data, user) => {
        if (!data || !user) {
          return null;
        }
        const name = Object.keys(data.taken).find(
          (name) => data.taken[name] === user
        );
        return name ?? null;
      }
    );
    const selectGift = createSelector(
      selectData,
      selectUser,
      (data, user) => user && data?.gifts[user]
    );
    const selectNames = createSelector(selectData, selectUser, (data, user) =>
      user ? data?.names[user] ?? null : null
    );
    const selectTakenNames = createSelector(selectData, (data) =>
      data ? Object.keys(data.taken) : null
    );

    return {
      selectUsers,
      selectPickedName,
      selectGift,
      selectNames,
      selectAvailableNames: createSelector(
        selectUser,
        selectNames,
        selectTakenNames,
        selectPickedName,
        (user, names, taken, pickedName) => {
          if (!user || pickedName) {
            return null;
          }
          return names && taken
            ? names.filter((name) => !taken.includes(name))
            : null;
        }
      ),
      selectPickedNameGift: createSelector(
        selectData,
        selectPickedName,
        (data, pickedName) =>
          pickedName && data ? data.gifts[pickedName] ?? null : null
      ),
      isPickUserState: createSelector(
        selectData,
        selectUser,
        (data, user) => data && !user
      ),
      isPickNameState: createSelector(
        selectUser,
        selectPickedName,
        (user, pickedName) => user && !pickedName
      ),
      isDoneState: createSelector(
        selectUser,
        selectPickedName,
        (user, pickedName) => user && pickedName
      )
    };
  }
});

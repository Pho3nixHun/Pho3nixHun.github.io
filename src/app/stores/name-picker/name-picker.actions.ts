import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NamePickerData } from './interfaces/name-picker.backend.interface';

export default createActionGroup({
  source: 'Name Picker',
  events: {
    loadState: emptyProps(),
    loadStateSuccess: props<{ data: NamePickerData }>(),
    loadStateFailure: props<{ error: Error }>(),
    pickUser: props<{ user: string }>(),
    pickName: props<{ user: string; name: string }>(),
    pickNameSuccess: props<{ data: NamePickerData }>(),
    pickNameFailure: props<{ error: Error }>(),
    setGift: props<{ user: string; gift: string }>(),
    setGiftSuccess: props<{ data: NamePickerData }>(),
    setGiftFailure: props<{ error: Error }>()
  }
});

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as namePickerEffects from './name-picker.effects';
import { namePickerFeature } from './name-picker.state';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([namePickerEffects]),
    StoreModule.forFeature(namePickerFeature)
  ]
})
export class NamePickerStoreModule {}

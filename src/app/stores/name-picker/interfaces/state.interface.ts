import { NamePickerData } from './name-picker.backend.interface';

export interface NamePickerState {
  user: string | null;
  loading: boolean;
  error: Error | null;
  data: NamePickerData | null;
}

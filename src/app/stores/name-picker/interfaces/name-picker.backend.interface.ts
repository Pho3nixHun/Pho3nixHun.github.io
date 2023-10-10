export type Names = Record<string, string[]>;
export type Taken = Record<keyof Names, keyof Names>;
export type Gifts = Record<keyof Names, string>;

/**
 * The data structure that is stored in the backend.
 * @property names: Combination of users (key: string) and names available for them to pick (value: string[]).
 * @property taken: Combination of already picked names (key: string) and the user that picked them (value: string).
 * @property gifts: Combination of users (key: string) and the gift they want (value: string).
 */
export interface NamePickerData {
  names: Names;
  taken: Taken;
  gifts: Gifts;
}

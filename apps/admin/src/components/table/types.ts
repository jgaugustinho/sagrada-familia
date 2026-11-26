export type PageSizeOption = 10 | 25 | 50 | 100;

export const PAGE_SIZE_OPTIONS: PageSizeOption[] = [ 10, 25, 50, 100 ];

export interface TableColumnOption<K extends string = string> {
  key: K;
  label: string;
  visible: boolean;
  defaultVisible: boolean;
}

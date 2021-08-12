/// <reference types="react-scripts" />
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>; 
type TypeLimiting = (null | number | ColumnType.name)
type Nullable<T> = T | null;
type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
export enum Format {
  json = 'json',
  csv = 'csv'
}
export const type = <const>['json', 'csv'];

interface GeneratorState {
  columns: ColumnType[]
  rows: any[]
  limiting: TypeLimiting,
  loading: boolean | undefined,
  editColumn: null | string,
  format: typeof type[number];
}
type ColumnType<T> = {
  name: string
  label: string
  type: string
  collect: string[]
  edit: boolean
  options: T
} 
type Option = {
  from?: Date | number
  to?: Date | number
  random: boolean
}
type OptionDate = Option & {
  days?: number[]
  startDate?: any
  endDate?: any
}
type OptionNumber = Option & {
  step: number
  ceil: boolean
}
type OptionString = {
  'from-to': [number, number]
  length: number
}

interface ObjectLiteral {
  [key: string]: any
}

function rangeNumber(range: Range<number>): number[]

declare function nestedFunc(arr: number): string[];
//  function lenFunc(s: string): number;
function lenFunc(num: number): nestedFunc;


export enum DaysOfWeek {
  Sun = 0,
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6
}
type Day = {
  label: string
  abbr: string
  active: boolean
}
type WeekDay = {
  value: Tuple<Day, 7>,
  onChange: any
}
export enum Interval {
  days = 'days',
  weeks = 'weeks',
  hours = 'hours'
}

interface IDateOption {
  days: number[]
  lengthDays: number
  dates: string[]
  limit: number
  mode: 'week'|'range'
  startDate: any
  endDate: string
}

type Field = {
  name: string
  label: string
  component: string
  value: any
  defaultValue: any
  rules: any[]
  onChange?: any
}

type FormField = {
  fields: Field[]
}




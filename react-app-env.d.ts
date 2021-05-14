/// <reference types="react-scripts" />
interface GeneratorState {
  columns: ColumnType[]
  rows: any[]
  limiting: TypeLimiting,
  loading: boolean | undefined,
  editColumn: null | string
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
  length: number
}

interface ObjectLiteral {
  [key: string]: any
}

function rangeNumber(range: Range<number>): number[]

declare function nestedFunc(arr: number): string[];
//  function lenFunc(s: string): number;
function lenFunc(num: number): nestedFunc;

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>; 
type TypeLimiting = (null | number | ColumnType.name)
type Nullable<T> = T | null;
export enum DaysOfWeek {
  Sun = 0,
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6
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

type Day = {
  label: string
  abbr: string
  active: boolean
}
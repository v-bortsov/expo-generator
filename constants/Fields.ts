import { countries, languages, currencies, getCitiesByCountry } from '../utils/network'

export const daysOfWeek = [{ label: 'Sunday', abbr: 'Sun', active: false }, { label: 'Monday', abbr: 'Mon', active: true }, { label: 'Tuesday', abbr: 'Tue', active: false }, { label: 'Wednesday', abbr: 'Wed', active: true }, { label: 'Thursday', abbr: 'Thu', active: false }, { label: 'Friday', abbr: 'Fri', active: true }, { label: 'Saturday', abbr: 'Sat', active: false }]
export const areas = [{ label: 'Custom', value: 'custom' }, { label: 'Integer', value: 'integer' }, { label: 'Dates', value: 'dates' }, { label: 'Dictionary', value: 'dictionary' },]
export const dictionaries= [{ label: 'Cities', value: 'cities' }, { label: 'Countries', value: 'countries' }, { label: 'Languages', value: 'languages' }, { label: 'Currencies', value: 'currencies' },]
// const { TextArea } = Input
export const baseColumn = ['name', 'label', 'type', 'collect']
export const unionFields = [{name: 'type', label: 'Type', rules: [{ required: true, message: 'Missing type' }], component: 'Select', options: areas, defaultValue: null}, {name: 'name', label: 'Name', rules: [{ required: true }], component: 'Input', defaultValue: 'asdfasf'}, {name: 'label', label: 'Label', rules: [{ required: true }], component: 'Input', defaultValue: null}, {name: 'collect', label: 'Collect', rules: [{ required: true }], component: 'TextArea', defaultValue: null, rows: 4}]
export const customFields = [...unionFields]

export const dateFields = [...unionFields, {name: 'days', label: 'Days of week', rules: [{ required: true }], component: 'WeekDays', defaultValue: daysOfWeek }, {name: 'startDay', label: 'Start Day', rules: [{ required: true }], component: 'DatePicker',  value: new Date()}, {name: 'limit', label: 'Limit', rules: [{ required: true }], component: 'InputNumber', defaultValue: 0 },]
export const integerFields = [...unionFields, {name: 'from', label: 'From', rules: [{ required: true }], component: 'InputNumber', defaultValue: 1 }, {name: 'to', label: 'To', rules: [{ required: true }], component: 'InputNumber', defaultValue: 10 }, {name: 'length', label: 'Length', rules: [{ required: true }], component: 'InputNumber', defaultValue: 10 },]
export const dictionaryFields = [...unionFields, {name: 'dictionary', label: 'Type', rules: [{ required: true, message: 'Missing type' }], component: 'Select', options: dictionaries, defaultValue: null}, {name: 'collect', label: 'Collect', rules: [{ required: true }], component: 'TextArea', defaultValue: null, rows: 4},]

export const requestByAreas = {
  countries: [['data', 'countries'], 'name', countries, []],
  languages: [['data', 'languages'], 'name', languages, []],
  currencies: [['data', 'currencies'], 'abbr', currencies, []],
  cities: [['data', 'countries', 0, 'cities'], 'name', getCitiesByCountry, [{countryId: 176, limit: 10}]],
}
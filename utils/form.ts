import { InputItem, TextareaItem } from '@ant-design/react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '@dietime/react-native-date-picker';
import * as moment from 'moment';
import { always, andThen, append, assoc, both, call, chain, clone, complement, compose, cond, converge, curry, equals, find, includes, indexBy, isEmpty, join, lensPath, lensProp, map, mergeAll, mergeRight, objOf, omit, over, pair, path, pick, pipe, pluck, prop, propEq, slice, T, tap, toPairs, transpose, when, zipObj, __ } from 'ramda';
import InputSpinner from 'react-native-input-spinner';
import { Select } from '../components/CustomPicker';
import { WeekDays } from '../components/WeekDays';
import { createColumn } from '../features/generator/generatorSlice';
import { AppDispatch, Field } from '../react-app-env';
// import { client } from "../client";
import { countries, currencies, getCitiesByCountry, languages } from './network';
import { mergeAndRestruct } from './popular';

const daysOfWeek = [{ label: 'Sunday', abbr: 'Sun', active: false }, { label: 'Monday', abbr: 'Mon', active: true }, { label: 'Tuesday', abbr: 'Tue', active: false }, { label: 'Wednesday', abbr: 'Wed', active: true }, { label: 'Thursday', abbr: 'Thu', active: false }, { label: 'Friday', abbr: 'Fri', active: true }, { label: 'Saturday', abbr: 'Sat', active: false }]
const areas = [{ label: 'Custom', value: 'custom' }, { label: 'Integer', value: 'integer' }, { label: 'Dates', value: 'dates' }, { label: 'Dictionary', value: 'dictionary' },]
const dictionaries= [{ label: 'Cities', value: 'cities' }, { label: 'Countries', value: 'countries' }, { label: 'Languages', value: 'languages' }, { label: 'Currencies', value: 'currencies' },]
// const { TextArea } = Input
const baseColumn = ['name', 'label', 'type', 'collect']

export const unionFields = [{name: 'type', label: 'Type', rules: [{ required: true, message: 'Missing type' }], component: 'Select', options: areas, defaultValue: null}, {name: 'name', label: 'Name', rules: [{ required: true }], component: 'Input', defaultValue: 'asdfasf'}, {name: 'label', label: 'Label', rules: [{ required: true }], component: 'Input', defaultValue: null}, {name: 'collect', label: 'Collect', rules: [{ required: true }], component: 'TextArea', defaultValue: null, rows: 4}]
export const customFields = [...unionFields]

export const dateFields = [...unionFields, {name: 'days', label: 'Days of week', rules: [{ required: true }], component: 'WeekDays', defaultValue: daysOfWeek }, {name: 'startDay', label: 'Start Day', rules: [{ required: true }], component: 'DatePicker',  value: new Date()}, {name: 'limit', label: 'Limit', rules: [{ required: true }], component: 'InputNumber', defaultValue: 0 },]
export const integerFields = [...unionFields, {name: 'from', label: 'From', rules: [{ required: true }], component: 'InputNumber', defaultValue: 1 }, {name: 'to', label: 'To', rules: [{ required: true }], component: 'InputNumber', defaultValue: 10 }, {name: 'length', label: 'Length', rules: [{ required: true }], component: 'InputNumber', defaultValue: 10 },]
export const dictionaryFields = [...unionFields, {name: 'dictionary', label: 'Type', rules: [{ required: true, message: 'Missing type' }], component: 'Select', options: dictionaries, defaultValue: null}, {name: 'collect', label: 'Collect', rules: [{ required: true }], component: 'TextArea', defaultValue: null, rows: 4},]
export const components = {
  Input: InputItem, InputNumber: InputSpinner, DatePicker,  Select, TextArea: TextareaItem, WeekDays
}
export const selectByType = cond<string, any[]>([[equals('custom'), always(customFields)], [equals('integer'), always(integerFields)], [equals('dates'), always(dateFields)], [equals('dictionary'), always(dictionaryFields)], [T, always([])]])

export const onFinish = curry((
  dispatch: any, state: any, values: any
) => pipe(
  indexBy<any>(prop('name')),
  over(
    lensPath(['startDay','value']),
    (e: any)=>moment(e)
      .format('DD.MM.YYYY')
  ),
  pluck('value'),
  mergeAndRestruct(
    baseColumn,
    'options'
  ),
  createColumn,
  dispatch
)(state.fields))

// const extracts = [
//   pipe(path(['data', 'countries', 0, 'cities']), pluck('name'))
// ]
const ext = curry((
  pointer: string[], name: string, data: any
)=>pipe<any, any, any, any>(
  path(pointer),
  pluck(name),
  join('\n')
)(data))

const extracts = {
  countries: [['data', 'countries'], 'name', countries, []],
  languages: [['data', 'languages'], 'name', languages, []],
  currencies: [['data', 'currencies'], 'abbr', currencies, []],
  cities: [['data', 'countries', 0, 'cities'], 'name', getCitiesByCountry, [{countryId: 176, limit: 10}]],
}

// pipe(
//   prop(__, extracts),
//   converge(converge(ext), [pipe(slice(0,2), map(always)), pipe(slice(2, 2), converge(apply, [prop(1), prop(2)]))]),
// )
const composeFunc = pipe<any,any,any,any,any>(
  prop(
    __,
    extracts
  ),
  slice(
    0,
    2
  ),
  map(always),
  append(clone)
)
const loadDictionaryData = curry((
  dispatch: AppDispatch, event: string
) => {
  // setDictionaryValue
  dispatch({name: 'collect', loading: true})
  // setLoaderCollect && setLoadedAndCollectList
  pipe(
    cond([
      [
        equals('countries'), pipe(
          always<any>(countries),
          call
        )
      ], [
        equals('languages'), pipe(
          always<any>(languages),
          call
        )
      ], [
        equals('currencies'), pipe(
          always<any>(currencies),
          call
        )
      ], [
        equals('cities'), pipe(
          always({countryId: 176, limit: 10}),
          getCitiesByCountry
        )
      ],
    ]),
    andThen(converge(
      ext,
      composeFunc(event)
    )),
    andThen(pipe(
      (value: string[])=> ({name: 'collect', value, loading: false}),
      dispatch
    ))
  )(event)

  return event
})


export const extractValueByComponent = curry((
  props, dispatch, event
) => cond<any, any>([
  // [
  //   includes(
  //     __,
  //     ['TextArea']
  //   ), pipe(
  //     always(event),
  //     path(['target', 'value'])
  //   )
  // ],
  [
    both(
      propEq(
        'component',
        'Select'
      ),
      propEq(
        'name',
        'dictionary'
      )
    ), pipe(
      always(event),
      loadDictionaryData(dispatch)
    )
  ], [
    propEq(
      'component',
      'DatePicker'
    ), pipe(always(event),
      // (e)=>moment(
      //   e,
      //   'DD.MM.YYYY'
      // )
    )
  ], [
    pipe(
      prop('component'),
      includes(
        __,
        ['Input', 'InputNumber', 'Select', 'TextArea']
      )
    ), compose(always(event))
  ], [equals('WeekDays'), compose(always(event))]
])(props))

export const buildFields = pipe(
  omit(['edit']),
  tap(x => console.log(
    'it is form',
    x
  )),
  when(
    complement(isEmpty),
    over<any, any>(
      lensProp('collect'),
      join('\n')
    )
  ),
  converge(
    mergeRight,
    [omit(['options']), prop('options')]
  ),
  toPairs,
  map(zipObj(['name', 'value'])),
  converge(
    pair,
    [
      pipe(
        find(propEq(
          'name',
          'type'
        )),
        prop('value'),
        selectByType
      ), clone
    ]
  ),
  transpose,
  map(mergeAll)
)
// (component: any)=> React.createElement(component)
export const getReactComponentFromCollect = pipe<Field, any, JSX.Element>(
  prop('component'),
  prop(
    __,
    components
  )
)
export const addValueAndOnChange: any = (dispatch: AppDispatch)=>chain(
  assoc('onChange'),
  curry((
    props: any, e: any
  )=>pipe<Field, any, any>(
    converge(
      mergeRight,
      [
        pick(['name']), always(pipe<any, any, any>(
        // !! multipleStoreChanges
          extractValueByComponent(
            props,
            dispatch
          ),
          objOf('value')
        )(e))
      ]
    ),
    dispatch
  )(props))
)

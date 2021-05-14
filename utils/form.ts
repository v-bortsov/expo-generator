import { InputItem, TextareaItem } from '@ant-design/react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '@dietime/react-native-date-picker';
import * as moment from 'moment';
import { always, andThen, append, assoc, both, call, chain, clone, complement, compose, cond, converge, curry, equals, find, has, includes, indexBy, isEmpty, join, lensPath, lensProp, map, mergeAll, mergeRight, objOf, omit, over, pair, path, pathEq, pick, pipe, pluck, prop, propEq, slice, split, T, tap, toPairs, transpose, when, zipObj, __ } from 'ramda';
import InputSpinner from 'react-native-input-spinner';
import { Select } from '../components/CustomPicker';
import { WeekDays } from '../components/WeekDays';
import { customFields, integerFields, dateFields, dictionaryFields, requestByAreas } from '../constants/Fields';
import { createColumn } from '../features/generator/generatorSlice';
import { AppDispatch, Field } from '../react-app-env';
// import { client } from "../client";
import { countries, currencies, getCitiesByCountry, languages } from './network';
import { findAndMerge, mergeAndRestruct } from './popular';

export const components = {
  Input: InputItem, InputNumber: InputSpinner, DatePicker,  Select, TextArea: TextareaItem, WeekDays
}
export const selectByType = cond<string, any[]>([[equals('custom'), always(customFields)], [equals('integer'), always(integerFields)], [equals('dates'), always(dateFields)], [equals('dictionary'), always(dictionaryFields)], [T, always([])]])

export const onFinish = curry((
  dispatch: any, state: any, slicer: any
) => pipe(
  indexBy<any>(prop('name')),
  when(
    has('startDay'),
    over(
      lensPath(['startDay', 'value']),
      (e: any)=>moment(e)
        .format('DD.MM.YYYY')
    ),
  ),
  when(
    pathEq(
      ['type', 'value'],
      'custom'
    ),
    over(
      lensPath(['collect', 'value']),
      split('\n')
    ),
  ),
  slicer,
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
// pipe(
//   prop(__, extracts),
//   converge(converge(ext), [pipe(slice(0,2), map(always)), pipe(slice(2, 2), converge(apply, [prop(1), prop(2)]))]),
// )
const composeFunc = pipe<any,any,any,any,any>(
  prop(
    __,
    requestByAreas
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


export const extractValueOfComponent = curry((
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
          extractValueOfComponent(
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

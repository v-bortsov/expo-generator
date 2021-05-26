import { addParam, cartesianCondition, enumToObject, findAndMerge,  propFilterAndPluck, sliceAndTranspose, multipledParts } from './popular'

import { DaysOfWeek } from '../../react-app-env.d'
import { initialState } from '../features/generator/generatorSlice'
import { add, always, propEq } from 'ramda'
import moment from 'moment'
import { dayOfWeekToDate } from './dates'
import { isCheck } from './validate'

it(
  'enumToObject',
  () => {
    expect(enumToObject(DaysOfWeek))
      .toEqual({
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6
      })
  }
)
it(
  'findAndMerge',
  () => {
    expect(findAndMerge(
      [{ test: 'a' }, { test: 'b' }, { test: 'c' }],
      { test: 'c', prop: 'add' },
      'test'
    ))
      .toEqual([{ test: 'a' }, { test: 'b' }, { test: 'c', prop: 'add' }])
  }
)
it(
  'multipledParts',
  () => {
    expect(multipledParts([['a', 'b', 'c'], ['d', 'e'], ['f', 'g']]))
      .toEqual([['a', 'd', 'f'], ['a', 'd', 'g'], ['a', 'e', 'f'], ['a', 'e', 'g'], ['b', 'd', 'f'], ['b', 'd', 'g'], ['b', 'e', 'f'], ['b', 'e', 'g'], ['c', 'd', 'f'], ['c', 'd', 'g'], ['c', 'e', 'f'], ['c', 'e', 'g']])
  }
)
it(
  'propFilterAndPluck',
  () => {
    expect(propFilterAndPluck(
      'name',
      'city',
      'collect'
    )(initialState.columns))
      .toEqual([['Socks', 'T-Shirt', 'Coat', 'Jeans', 'Trousers', 'Sneakers'], ['Baker', 'Health Educator', 'Budget Analyst', 'Design Engineer', 'Designer', 'Backend Developer']])
  }
)
it(
  'sliceAndTranspose',
  () => {
    expect(sliceAndTranspose(
      initialState.columns,
      ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'],
      propEq(
        'name',
        'Skill'
      )
    ))
      .toEqual([['first', 'Baker'], ['second', 'Health Educator'], ['third', 'Budget Analyst'], ['fourth', 'Design Engineer'], ['fifth', 'Designer'], ['sixth', 'Backend Developer']])
  }
)
it(
  'cartesianCondition',
  () => {
    expect(cartesianCondition(
      [{ name: 'x', collect: ['a', 'b', 'c'] }, { name: 'y', collect: ['d', 'e'] }, { name: 'z', collect: ['f', 'g'] }],
      null
    ))
      .toEqual([{ x: 'a', y: 'd', z: 'f' }, { x: 'a', y: 'd', z: 'g' }, { x: 'a', y: 'e', z: 'f' }, { x: 'a', y: 'e', z: 'g' }, { x: 'b', y: 'd', z: 'f' }, { x: 'b', y: 'd', z: 'g' }, { x: 'b', y: 'e', z: 'f' }, { x: 'b', y: 'e', z: 'g' }, { x: 'c', y: 'd', z: 'f' }, { x: 'c', y: 'd', z: 'g' }, { x: 'c', y: 'e', z: 'f' }, { x: 'c', y: 'e', z: 'g' }])
  }
)
it(
  'addParam',
  () => {
    expect(addParam(
      'name',
      add,
      [always(1), always(1)]
    )({ pizza: 'formadgo' }))
      .toEqual({
        pizza: 'formadgo',
        name: 2
      })
  }
)
it(
  'dayOfWeekToDate',
  () => {
    expect(dayOfWeekToDate({
      limit: 12,
      startDate: '11.04.2021',
      days: [{ label: 'Sunday', abbr: 'Sun', active: true }, { label: 'Monday', abbr: 'Mon', active: false }, { label: 'Tuesday', abbr: 'Tue', active: true }, { label: 'Wednesday', abbr: 'Wed', active: false }, { label: 'Thursday', abbr: 'Thu', active: true }, { label: 'Friday', abbr: 'Fri', active: false }, { label: 'Saturday', abbr: 'Sat', active: false }]
    }))
      .toEqual({
        limit: 12,
        startDate: '11.04.2021',
        days: [0, 2, 4],
        collect: ['11.04.2021', '13.04.2021', '15.04.2021', '18.04.2021', '20.04.2021', '22.04.2021', '25.04.2021', '27.04.2021', '29.04.2021', '02.05.2021', '04.05.2021', '06.05.2021']
      })
  }
)
it(
  'validate isEmpty',
  () => {
    expect(isCheck({
      rules: [['isEmpty', 'field is empty'], ['isNumeric', 'need typing numeric']],
      value: '432'
    }))
      .toEqual('need typing email')
  }
)

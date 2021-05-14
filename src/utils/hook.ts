import { converge, assocPath, path, prop, always, clone, map, ifElse, propEq, __, assoc, pipe, pair, cond, pathEq, isEmpty, not, tap } from 'ramda'
import { selectByType } from './form'
import { findAndMerge } from './popular'

const actionOnDictionaryField = clone

const updateFields = (func: any)=>converge(
  assocPath([0, 'fields']),
  [func, clone]
)

const actionOnOtherFields = updateFields(converge(
  findAndMerge,
  [path<any>([0, 'fields']), prop<any>(1), always('name')]
))
const actionOnTypeField = updateFields(converge(
  map,
  [
    converge(
      ifElse(
        propEq(
          'name',
          'type'
        ),
        __,
        converge(
          assoc('value'),
          [prop('defaultValue'), clone]
        )
      ),
      [
        pipe(
          path([1, 'value']),
          assoc('value')
        )
      ]
    ), pipe(
      path([1,'value']),
      selectByType
    )
  ]
))
export const reducerFields = pipe(
  pair,
  cond([
    [
      pathEq(
        [1, 'name'],
        'type'
      ), actionOnTypeField
    ], [
      pathEq(
        [1, 'name'],
        'dictionary'
      ), actionOnDictionaryField
    ], [
      pathEq(
        [1, 'name'],
        'updateFields'
      ), updateFields(path([1, 'value']))
    ], [
      pipe(
        prop(1),
        isEmpty,
        not
      ), actionOnOtherFields
    ], [
      pipe(
        prop(1),
        isEmpty
      ), clone
    ]
  ]),
  prop<any>(0)
)
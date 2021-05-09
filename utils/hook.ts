import { converge, assocPath, path, prop, always, clone, map, ifElse, propEq, __, assoc, pipe, pair, cond, pathEq, isEmpty, not } from 'ramda'
import { selectByType } from './form'
import { findAndMerge } from './popular'

const actionOnDictionaryField = clone

const actionOnOtherFields = converge(
  assocPath([0, 'fields']),
  [
    converge(
      findAndMerge,
      [path<any>([0, 'fields']), prop<any>(1), always('name')]
    ), clone
  ]
)
const actionOnTypeField = converge(
  assocPath([0, 'fields']),
  [
    converge(
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
    ), clone
  ]
)
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
import { always, append, assoc, chain, clone, converge, curry, filter, flatten, is, length, map, mergeRight, objOf, of, omit, path, pick, pipe, pluck, prop, propEq, reject, slice, splitAt, transpose, values, when, zipObj, __, xprod, adjust, findIndex, tap, cond, find, hasPath, identity, pathEq, product, T } from 'ramda';
// import { multipledParts } from 'ramda-combo';
// import {Maybe} from 'ramda-fantasy'
import { ColumnType, Field, ObjectLiteral, Option, OptionDate, OptionNumber, TypeLimiting } from '../../react-app-env';

const RF = require('ramda-fantasy'),
  Maybe = RF.Maybe,
  Just    = Maybe.Just,
  Nothing = Maybe.Nothing;
export const multipledParts: any = (parts: any[][]) => parts.reduce(<any>xprod)
// const seq = sequence(Maybe.of, [Maybe.Just(1), Maybe.Just(2), Maybe.Just(3)])
// const lenFuncTest = lenFunc("string")
// lenFunc("asdfasf")
//   .map(<any>flatten)
export const sliceAndTranspose = curry((
  columns: ColumnType<OptionNumber | OptionDate | Option>[], multipled: any[], equalsName: any
) => pipe(
  filter<any, any>(equalsName),
  path([0, 'collect']),
  converge(
    append,
    [
      clone, pipe(
        converge(
          slice(0),
          [length, always(multipled)]
        ),
        of
      )
    ]
  ),
  transpose
)(columns))
export const multipleCount = pipe<any,any,any,any>(
  filter(hasPath(['collect', 'value', 'length'])),
  map(path(['collect', 'value', 'length'])),
  values,
  product
)
export const calcCount = (
  columns: any, limiting: (null | string | number)
)=>cond([
  [is(Number), identity], [
    is(String), pipe(
      pathEq(['name', 'value']),
      find(
        __,
        columns
      ),
      path(['collect', 'value']),
      length
    )
  ], [T, always(multipleCount(columns))]
])(limiting)
/**
 *   CartesianProduct Non using Ramda
  const result = parts.reduce((
    a, b
  ) => a.reduce(
    (
      r, v
    ) => r.concat(b.map(w => [].concat(
      v, w
    ))), []
  ))
 */
// TODO: REDUCE ~> one cycle
export const propFilterAndPluck = (
  propNameEq: string, propValue: string, propPluck: string
): any => pipe<any, any, any>(
  reject(propEq(
    propNameEq,
    propValue
  )), 
  pluck(propPluck)
)
export const cartesianCondition: any = (
  columns: ColumnType<OptionNumber | OptionDate | Option>[], limiting: TypeLimiting
) => pipe<any, any, any, any, any, any>(
  propFilterAndPluck(
    'name',
    limiting,
    'collect'
  ),
  multipledParts,
  when(
    always(is(
      String,
      limiting
    )),
    sliceAndTranspose(
      columns,
      __,
      propEq(
        'name',
        limiting
      )
    )
  ),
  when(
    always(is(
      Number,
      limiting
    )),
    slice(
      0,
      limiting
    )
  ),
  map(pipe<any, any, any>(
    flatten,
    converge(
      zipObj,
      [
        always(pluck(
          'name',
          columns
        )), clone
      ]
    )
  ))
)(columns)
export const enumToObject: any = pipe<any, any, any, any>(
  values,
  converge(
    splitAt,
    [
      pipe<any, any, any>(
        filter(is(Number)),
        length
      ), clone
    ]
  ),
  converge(
    zipObj,
    [prop<any>(0), prop<any>(1)]
  )
)

export const findByNameAndChangeScope = (
  findBy: string, change: any
): typeof converge => converge(
  adjust<any>(
    __,
    change
  ),
  [
    findIndex(propEq(
      'name',
      findBy
    )), clone
  ]
)

export const findAndMerge = curry((
  els: any[], element: ObjectLiteral, propName: string
): any => map(<any>when(
  propEq(
    propName,
    prop(
      propName,
      element
    )
  ),
  mergeRight<any, any>(
    __,
    element
  )
))(els))

export const addParam = curry((
  name: string, func: any, args: any[]
) => chain(
  assoc(name),
  converge(
    func,
    args
  )
))
export const mergeAndRestruct = curry((
  columns: string[], wrapper: string
)=>converge(
  mergeRight,
  [
    pick(columns), pipe(
      omit(columns),
      objOf(wrapper)
    )
  ]
))
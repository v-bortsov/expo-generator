import { always, apply, assoc, append, clone, complement, converge, curry, ifElse, isEmpty, isNil, last, pipe, prepend, prop, reduce, reduced, tap, values, when, __, includes, path, map, mergeRight, not } from 'ramda';
import validator from 'validator';
import { Field, Nullable } from '../../react-app-env';
import { store } from '../store'

const customRules = {
  uniqNameByColumns: (value: string)=> pipe<any,any,any,any>(
    path(['generator', 'columns']),
    map(path(['name', 'value'])),
    includes(value),
  )(store.getState())
}
const getFuncAndCall = curry((
  func: any, args: any[]
)=>pipe<any, any, any>(
  prop(
    __,
    mergeRight(
      validator,
      customRules
    )
  ),
  apply(
    __,
    args
  ),
)(func))
const modifyArgs = (value: string)=>pipe(
  converge(
    assoc(2),
    [
      pipe(
        prop(2),
        when(
          isNil,
          always([])
        ),
        prepend(isNil(value) ? '' : value)
      ), clone
    ]
  ),
  values,
)
const validate = curry((
  flag: boolean, obj: any[]
)=>ifElse(
  always(flag),
  pipe(
    prop(1),
    reduced
  ),
  always(null),
)(obj))

export const isCheck = ({rules, value, name}: any): string[]=> reduce<any, any>(
  (
    acc: any, item: any[]
  )=>pipe(
    modifyArgs(value),
    converge(
      validate,
      [
        converge(
          getFuncAndCall,
          [prop(0), prop(2)]
        ), clone
      ]
    ),
  )(item),
  []
)(rules)

export const isAllFieldsCheck = (fields: Field[]): any => pipe(
  reduce<any, any>(
    (
      acc: any, item: any
    )=> !isNil(isCheck(item)) ? reduced(isCheck(item)) : false,
    []
  ),
  ifElse(
    isEmpty,
    always(false),
    always(true)
  ),
  tap(x => console.log(
    'isAllFields',
    x
  )),
)(fields)
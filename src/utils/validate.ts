import { always, apply, assoc, clone, complement, converge, curry, evolve, ifElse, includes, isEmpty, isNil, map, mergeRight, path, paths, pipe, prepend, prop, propEq, reduce, reduced, tap, values, when, whereEq, zipObj, __ } from 'ramda';
import validator from 'validator';
import { Field } from '../../react-app-env';
import { store } from '../store';

const customRules = {
  uniqNameByColumns: (value: string)=> pipe<any,any,any,any>(
    paths([['generator', 'columns'],['generator', 'editColumn']]),
    zipObj(['columns', 'editColumn']),
    evolve({
      columns: map(path(['name', 'value']))
    }),
    ifElse(
      whereEq({
        'editColumn':
        null
      }),
      pipe(
        prop('columns'),
        includes(value)
      ),
      always(false)
    )
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
    _, item: any[]
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
      _: any, item: any
    )=> !isNil(isCheck(item)) ? reduced(isCheck(item)) : false,
    []
  ),
  complement(isEmpty)
)(fields)
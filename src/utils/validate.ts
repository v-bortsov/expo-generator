import { always, assoc, clone, converge, curry, ifElse, isNil, pipe, prepend, prop, reduce, reduced, tap, values, when } from 'ramda';
import validator from 'validator';
// console.log(validator);
const customRules = {
  uniqNameByColumns: clone
}
const getFuncAndCall = curry((
  func: any, args: any[]
)=>pipe(
  // prop(
  //   __,
  //   validator
  // ),
  // curry,
  // apply(
  //   __,
  //   args
  // )
  (funcName: string)=>{
    console.log(
      'args',
      args
    );
    return validator[funcName](...args)
  })(func))
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
        prepend(value)
      ), clone
    ]
  ),
  values,
)
const validate = (
  flag: boolean, obj: any[]
)=>ifElse(
  always(flag),
  pipe(
    prop(1),
    reduced
  ),
  always(null),
)(obj)

export const isCheck = ({rules, value}: any): string[]=>pipe(
  reduce<any, any>(
    (
      acc: any, item: any[]
    )=>pipe(
      modifyArgs(value),
      converge(
        pipe(
          tap(x => console.log(
            'validate',
            x
          )),
          validate
        ),
        [
          converge(
            getFuncAndCall,
            [prop(0), prop(2)]
          ), clone
        ]
      ),
      tap(x => console.log(
        'isCheck',
        x
      )),
    )(item),
    {} ,
  ),
  tap(x => console.log(
    'test',
    x
  )),

)(rules)
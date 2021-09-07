import { FormControl, useContrastText } from 'native-base';
import { always, both, converge, curry, identity, join, lensProp, map, memoizeWith, omit, over, pick, pipe, prop, propEq, when } from 'ramda';
import React from 'react';
import { Field } from '../../../react-app-env';
import { AppDispatch } from '../../store';
import { addValueAndOnChange, getReactComponentFromCollect } from '../../utils';

const beforePassProps = pipe<any,any,any,any>(
  pick(['component', 'name', 'value', 'format', 'defaultValue', 'onChange', 'options', 'rows']),
  when(
    both(
      propEq(
        'component',
        'DatePicker'
      ),
      propEq(
        'value',
        undefined
      )
    ),
    over(
      lensProp('value'),
      always(new Date())
    )
  ),
  when(
    propEq(
      'name',
      'collect'
    ),
    over(
      lensProp('value'),
      join<any>('\n')
    )
  ),
  omit(['component', 'name'])
)

const getComponentWithProps = curry((
  Component: any, props: Field
): JSX.Element => 
  <FormControl key={props.name} isRequired>
    <FormControl.Label _text={{ color: useContrastText('emerald.700') }}>{props.label}:</FormControl.Label>
    <Component  {...beforePassProps(props)} />
    {/* {
      pipe<any, any, any, any>(
        pick(['rules', 'value', 'name']),
        isCheck,
        tap(x => console.log(
          'isCheck',
          x
        )),
        when<any, JSX.Element>(
          is(String),
          (text: string)=><FormControl.ErrorMessage>
            {text}
          </FormControl.ErrorMessage>
        )
      )(props)
    } */}
  </FormControl>
)
export default ({state, dispatch, idx}: { idx: number, state: any, dispatch: AppDispatch}): JSX.Element => pipe<any, any, any>(
  prop<any, any>('fields'),
  memoizeWith(
    identity, 
    map(converge(
      getComponentWithProps,
      [
        getReactComponentFromCollect, addValueAndOnChange(
          dispatch,
          idx
        )
      ]
    )
  ))
)(state)
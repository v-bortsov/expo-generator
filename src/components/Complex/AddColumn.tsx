import { FormControl, useContrastText, VStack } from 'native-base';
import { always, both, complement, converge, curry, equals, is, join, lensPath, lensProp, map, objOf, omit, over, pick, pipe, prop, propEq, tap, when } from 'ramda';
import React from 'react';
import { Field, FormField } from '../../../react-app-env';
import { AppDispatch } from '../../store';
import { addValueAndOnChange, getReactComponentFromCollect, isCheck } from '../../utils';

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
): JSX.Element => <VStack space={4} mx={10} width="80%">
  <FormControl isRequired>

    <FormControl.Label _text={{ color: useContrastText('emerald.700') }}>{props.label}:</FormControl.Label>
    <Component {...beforePassProps(props)} />
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
</VStack>)

export default ({state, dispatch, idx}: { idx: number, state: any, dispatch: AppDispatch}): JSX.Element => pipe<any, any, any>(
  prop<any, any>('fields'),
  map(converge(
    getComponentWithProps,
    [
      getReactComponentFromCollect, addValueAndOnChange(
        dispatch,
        idx
      )
    ]
  ))
)(state)
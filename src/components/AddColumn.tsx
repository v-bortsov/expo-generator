import { Card } from '@ant-design/react-native';
import { always, assoc, both, clone, complement, converge, curry, isNil, join, lensProp, map, omit, over, pick, pipe, prop, propEq, split, tap, when, __ } from 'ramda';
import React, { useReducer } from 'react';
import { Text, View } from 'react-native';
import { AppDispatch, Field, FormField } from '../react-app-env';
import { addValueAndOnChange, getReactComponentFromCollect } from '../utils/form';
import { reducerFields } from '../utils/hook';

const getComponentWithProps = curry((
  Component: any, props: Field
): JSX.Element => <View>
  <Text style={{ fontSize: 20}}>{props.label}:</Text>
  <Component
    {...pipe(
      pick(['component', 'value', 'format', 'defaultValue', 'onChange', 'options', 'rows']),
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
      // when(
      //   propEq('component', 'TextArea'),
      //   over(
      //     lensProp('value'),
      //     when(complement(isNil),split('\n'))
      //   )
      // ),
      omit(['component'])
    )(props)}
  />
</View>)

export const Fields: React.FC<{state: FormField, dispatch: AppDispatch}> = ({state, dispatch}: {state: FormField, dispatch: AppDispatch}) => pipe<any, any, any>(
  prop<any, any>('fields'),
  map(converge(
    getComponentWithProps,
    [getReactComponentFromCollect, addValueAndOnChange(dispatch)]
  ))
)(state) 

export const FormFields = ([state, dispatch]: any): JSX.Element=>(
  <View>
    <Card>
      <Card.Header title="Add Column"  extra="this is extra" />
      <Card.Body>
        <Fields {...{state, dispatch}} />
      </Card.Body>
    </Card>
  </View>
)


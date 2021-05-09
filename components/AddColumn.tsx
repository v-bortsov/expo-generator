import { Button, Card } from '@ant-design/react-native';
import { always, assoc, both, clone, converge, curry, lensProp, map, omit, over, pick, pipe, prop, propEq, tap, when, __ } from 'ramda';
import React, { useReducer } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch, Field, FormField } from '../react-app-env';
import { addValueAndOnChange, getReactComponentFromCollect, onFinish } from '../utils/form';
import { reducerFields } from '../utils/hook';

const getComponentWithProps = curry((
  Component: any, props: Field
): JSX.Element => <Component {...pipe(
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
  omit(['component'])
)(props)}/>)

export const Fields: React.FC<{state: FormField, dispatch: AppDispatch}> = ({state, dispatch}: {state: FormField, dispatch: AppDispatch}) => pipe<any, any, any>(
  prop<any, any>('fields'),
  map(converge(
    getComponentWithProps,
    [getReactComponentFromCollect, addValueAndOnChange(dispatch)]
  ))
)(state) 

const FormFields = ([state, dispatch]: any): JSX.Element=>(
  <View>
    <Card>
      <Card.Header title="Add Column"  extra="this is extra" />
      <Card.Body>
        <Fields {...{state, dispatch}} />
        <Button
          onPress={onFinish(
            useDispatch(),
            state
          )}
          type="primary"
        >
          Submit
        </Button>
      </Card.Body>
    </Card>
  </View>
)
export const AddColumn = ({fields}: any): JSX.Element => pipe<any, any, any, any>(
  converge(
    curry(useReducer),
    [
      always(reducerFields), clone, always(assoc(
        'fields',
        __,
        {}
      ))
    ]
  ),
  tap(x => console.log(
    'state',
    x
  )),
  FormFields
)(fields)


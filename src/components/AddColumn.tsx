import { VStack, FormControl } from 'native-base';
import { always, both, complement, converge, curry, equals, lensProp, map, omit, over, pick, pipe, prop, propEq, tap, when } from 'ramda';
import React from 'react';
import { Text, View } from 'react-native';
import { Field, FormField } from '../../react-app-env';
import { AppDispatch } from '../store';
import { addValueAndOnChange, getReactComponentFromCollect } from '../utils/form';
import { isCheck } from '../utils/validate';

const getComponentWithProps = curry((
  Component: any, props: Field
): JSX.Element => <VStack space={4} mx={10} width="80%">
  <FormControl isRequired>
    <FormControl.Label>{props.label}:</FormControl.Label>
    {/* <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{props.label}:</Text> */}
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
    {
      pipe<any, any, any, any>(
        pick(['rules', 'value', 'name']),
        tap(x => console.log(
          'field before ran isCheck',
          x
        )),
        isCheck,
        when(
          complement(equals(false)),
          // (text)=><Text style={{ fontSize: 10, fontWeight: 'normal', color: 'white', backgroundColor: 'red'}}>{text}</Text>
          (text: string)=><FormControl.ErrorMessage>
            {text}
          </FormControl.ErrorMessage>
        )
      )(props)
    }
  </FormControl>
</VStack>)

export const Fields: React.FC<{state: FormField, dispatch: AppDispatch}> = ({state, dispatch}: {state: FormField, dispatch: AppDispatch}) => pipe<any, any, any>(
  prop<any, any>('fields'),
  map(converge(
    getComponentWithProps,
    [getReactComponentFromCollect, addValueAndOnChange(dispatch)]
  ))
)(state)

export const FormFields = ({state, fieldsDispatch: dispatch}: any): JSX.Element=>(
  <View>
    {/* <Card>
      <Card.Header title="Add Column"  extra="this is extra" />
      <Card.Body> */}
    <Fields {...{state, dispatch}} />
    {/* </Card.Body>
    </Card> */}
  </View>
)


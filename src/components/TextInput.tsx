import { omit, pipe, tap } from 'ramda';
import React from 'react';
import {Input as TextInput} from 'native-base'

export const Input: React.FC<any> = (props: any)=>   <TextInput
  onChangeText={props.onChange}
  {...omit(
    ['onChange'],
    props
  )}
  variant="filled"
  placeholder="Filled"
  _light={{
    placeholderTextColor: 'blueGray.400',
  }}
  _dark={{
    placeholderTextColor: 'blueGray.50',
  }}
/>
{/* <TextInput
  onChangeText={props.onChange}
  {...omit(
    ['onChange'],
    props
  )} /> */}
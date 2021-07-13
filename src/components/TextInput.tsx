import { omit, pipe, tap } from 'ramda';
import React from 'react';
import {TextInput} from 'react-native'
export const Input: React.FC<any> = (props: any)=><TextInput
  onChangeText={props.onChange}
  {...omit(
    ['onChange'],
    props
  )} />
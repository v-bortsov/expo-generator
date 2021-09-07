import React from 'react'
import Slide from '@react-native-community/slider';
import { View, Text } from '../Themed'
import { omit, props } from 'ramda';

const Slider = (props: any)=>(
  <View style={{flex: 1}}>
    <Slide
      style={{width: 200, height: 40}}
      {...omit(['onChange'],props)}
      minimumValue={0}
      step={1}
      value={props.value ? props.value : props.defaultValue}
      maximumValue={100}
      minimumTrackTintColor="#ff0000"
      maximumTrackTintColor="#000000"
      onValueChange={ props.onChange }
    />
    <Text>
      Starts: {props.value ? props.value : props.defaultValue}
    </Text>
  </View>
)

export {Slider}

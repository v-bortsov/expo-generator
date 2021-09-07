import { theme } from '../../constants/Colors';
import { omit, pipe, tap, pick } from 'ramda';
import React, { useState } from 'react';
import {  TextInput, StyleSheet, Platform, Text, View} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Hoverable from './Hoverable';

export const TextInputHover = ({text, onChange, fontSize}: any) => {
  const [toggle, setToggle] = useState(false)
  return <View> {toggle
    ? <Input style={{ padding: 5, fontSize, borderRadius: 10, borderColor: theme.colors.dart, backgroundColor: '#fff', minWidth: 200}} onKeyPress={(e: any)=>e.nativeEvent.key==='Enter' ? setToggle(false) : null } value={text} onChange={onChange} autoFocus InputRightElement={<MaterialCommunityIcons onPress={()=> setToggle(!toggle)} size={fontSize} name={'file-edit'} />} /> 
    : <Hoverable>
      {(isHovered: boolean) => (
        <View style={[styles.editField, isHovered && {borderRadius: 10, borderColor: theme.colors.dart, backgroundColor: 'grey'}]}>
          <Text numberOfLines={1} style={[styles.topField, {fontSize}]}>{text}</Text>
          {isHovered && <MaterialCommunityIcons onPress={()=> setToggle(!toggle)} size={fontSize} name={'file-edit'} />}
        </View>
      )}
    </Hoverable>
  }</View>
}

export const Input = (props: any) => <View
  style={[
    styles.containerInput, omit(
      ['fontSize', 'padding'],
      props.style
    )
  ]}>
  <TextInput
    style={[
      styles.input, pick(
        ['fontSize', 'padding'],
        props.style
      )
    ]}
    {...omit(
      ['InputRightElement', 'style'],
      props
    )} />
  {props.InputRightElement}
</View> 


const styles = StyleSheet.create({
  containerInput: {flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'},
  input: {
    ...Platform.select({
      web: {  
        outlineStyle: 'none',
        outlineWidth: 0
      },
    })
  },
  editField: {flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', minWidth: 200},
  topField: { padding: 5},
})
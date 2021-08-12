import React, { useEffect, useRef, useState } from 'react'
import { Animated, Button, Easing, Pressable, StyleSheet} from 'react-native'
import {Text, View } from '../Themed'
interface Collapse {
  idx: number
  duration: number
  header: JSX.Element
  summary: JSX.Element
  icon?: JSX.Element
  borderStyle?: any
  backgroundColor?: any
  buttonProps?: any
  Button?: any
}
export const collapseView = (
  duration: number,animationHeight: any,  toValue: number
) => {
  Animated.timing(
    animationHeight,
    {
      duration,
      easing: Easing.back(1),
      toValue,
      useNativeDriver: false
    }
  )
    .start();
}
const Collapse = ({idx, duration, header, summary, icon, borderStyle,  backgroundColor, Button, buttonProps }: Collapse) => {
  const [open, setOpen] = useState(false)
  const animationHeight = useRef(new Animated.Value(0)).current;
  useEffect(
    () => collapseView(
      duration,
      animationHeight,
      !open ? 0 : 1
    ),
    [open]
  );
  return (
    <View key={idx} style={borderStyle}>
      <Pressable key={`press_${idx}`} onPress={Button ?  undefined : ()=>setOpen(!open)} style={[styles.summary, {backgroundColor}]}>
        {header}
        <View key={`view_${idx}`} style={[styles.turnoverSummary, {backgroundColor}]}>
          <Animated.View
            key={`header_${idx}`}
            style={{
              transform: [
                {
                  rotate: animationHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                    extrapolate: 'clamp',
                  })
                }
              ]
            }}>
            {Button ? <Button key={`button_${idx}`} {...buttonProps} onPress={()=>  setOpen(!open)} />   : icon}
          </Animated.View>
        </View>
      </Pressable>
      <Animated.View
        key={`desc_${idx}`}
        style={{maxHeight: animationHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 300],
          extrapolate: 'clamp',
        }), overflow: 'hidden', backgroundColor: '#0891b2'}}>
        {summary}
      </Animated.View>
    </View>
  )
}
const parentMargin = {marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: -5}
const childMargin = {marginTop: 0, marginRight: 0, marginBottom: 5, marginLeft: 5}
const styles = StyleSheet.create({
  summary: {flex: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'space-around',  flexDirection: 'row',  ...parentMargin},
  turnoverSummary: { flex: 1, ... childMargin},
})
export default Collapse



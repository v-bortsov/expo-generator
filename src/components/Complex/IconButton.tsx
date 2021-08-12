
import React from 'react'
import { StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { View, Text } from '../Themed'
import Hoverable from '../Primitives/Hoverable'
interface IconButton {
  onPress: any
  startIcon: JSX.Element
  endIcon?: JSX.Element
  children: string | JSX.Element
  isDisabled?: any
  style?: any
  hoverBg?: string
  opacity?: number
}
const IconButton = ({onPress, startIcon, endIcon, children, isDisabled, style, hoverBg, opacity}: IconButton) => (
  <Pressable disabled={isDisabled} onPress={onPress}>
    <Hoverable>
      {isHovered => (
        <TouchableOpacity
          disabled={isDisabled}
          accessible={true}
          activeOpacity={0.3}
          onPress={onPress}
          style={[styles.container, style, {opacity}, isHovered&&!isDisabled && {backgroundColor: hoverBg}]}
        >
          <Text style={{textAlignVertical: 'center', color: '#fff'}}>
            {startIcon && startIcon} {children}
          </Text>
        </TouchableOpacity>
      )}
    </Hoverable>
  </Pressable>
)

export default IconButton

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 24,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    textAlignVertical: 'center'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

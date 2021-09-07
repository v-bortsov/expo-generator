import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Modal } from 'react-native'
export const hairlineWidth = StyleSheet.hairlineWidth
export const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#e5e5e5'
  },
  titleBox: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  titleText: {
    color: '#757575',
    fontSize: 14
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  messageText: {
    color: '#9a9a9a',
    fontSize: 12
  },
  buttonBox: {
    height: 50,
    marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: 18
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
}
const CustomActionSheet = ({visible, children}) => {
  const sheetAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(
    () => {
      Animated.timing(
        sheetAnim,
        {
          duration: 1000,
          toValue: visible ? 300 : 0,
          useNativeDriver: false
        }
      )
        .start();
    },
    [visible]
  )

  return (
    <View>
      <Modal
        visible={false}
        animationType='slide'
        transparent
        style={{position: 'absolute', width: 200, height: 100}}
        // onRequestClose={this._cancel}
      >
        <View style={[styles.wrapper]}>
          {/* <Text
              style={[styles.overlay]}
              onPress={this._cancel}
            /> */}
          <Animated.View
            style={[styles.body, {  transform: [{ translateY: sheetAnim}]}]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

export default CustomActionSheet

import { always, curry, lensIndex, omit, over, pipe, __ } from 'ramda';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import InputSpinner from 'react-native-input-spinner';


const middleware = curry((
  num: number, propsValue: [number,number], val: number
)=>over(
  lensIndex(num),
  always(val),
  propsValue
))

const Multislider = (props: any) => (
  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
    <InputSpinner
      colorMax={'#f04048'}
      colorMin={'#40c5f4'}
      style={styles.spinner}
      rounded={false}
      showBorder={true}
      editable={false}
      onChange={pipe(
        middleware(
          0,
          props.value
        ),
        props.onChange
      )}
      value={props.value[0]}
      {...omit(
        ['value', 'onChange'],
        props
      )}
    />
    <InputSpinner
      colorMax={'#f04048'}
      colorMin={'#40c5f4'}
      style={styles.spinner}
      rounded={false}
      showBorder={true}
      editable={false}
      onChange={pipe(
        middleware(
          1,
          props.value
        ),
        props.onChange
      )}
      value={props.value[1]}
      {...omit(
        ['value', 'onChange'],
        props
      )}
    />
  </View>
)
const styles = 	StyleSheet.create({
  spinner: {
    flex: 1,
    marginRight: 10,
    minWidth: 150,
  }
})
export { Multislider }

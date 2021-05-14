import * as React from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet} from 'react-native';

export function Select({value, onChange, options}: any){
  return (
    <Picker
      style={styles.select}
      selectedValue={value}
      onValueChange={onChange}>
      {options.map(({value, label}: any)=><Picker.Item style={styles.option} key={value} label={label} value={value}/>)}
    </Picker>
  )
}
const styles = StyleSheet.create({
  select: {
    height: 30,
    fontSize: 20,
  },
  option: {
    fontSize: 20,
  }
});
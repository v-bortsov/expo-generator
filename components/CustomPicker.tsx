import * as React from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet} from 'react-native';

export function Select({value, onChange, options}: any){
  return (
    <Picker
      style={styles.select}
      selectedValue={value}
      onValueChange={onChange}>
        {options.map(({value, label})=><Picker.Item key={value} label={label} value={value}/>)}
    </Picker>
  )
}
const styles = StyleSheet.create({
  select: {
    height: 50,
    fontSize: 25,
  }
});
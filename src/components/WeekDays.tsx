import React from 'react'
import { always, lensProp, not, over, pipe, when, __ } from 'ramda'
import { AppDispatch, Day } from '../react-app-env'
import { findAndMerge } from '../utils/popular'
import { TouchableOpacity, View,  Text, StyleSheet } from 'react-native';
export const setDay = (
  day: Day, days: Day[], setDays: AppDispatch
): any => pipe(
  over<any,any>(
    lensProp('active'),
    not
  ),
  findAndMerge(
    days,
    __,
    'abbr'
  ),
  setDays
)(day)

type WeekDays = {
  value: Day[],
  onChange: any
}
export const WeekDays = ({ value, onChange }: WeekDays): JSX.Element => (
  <View style={styles.container}>
    { 
      value.map((
        day: Day, idx: number
      ) => <TouchableOpacity
        style={[styles.day, day.active && styles.dayActive]}
        key={ idx }
        onPress={()=> setDay(
          day,
          value,
          onChange
        )
        }>

        <Text>{day.abbr}</Text>
      </TouchableOpacity>)
    }
  </View>
)
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: 'rgb(255, 255, 255)', justifyContent: 'space-between', margin: 15, height: 100 },
  day: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    alignContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '50%',
    borderWidth: 1,
    fontSize: 35,
    borderColor: 'rgb(0, 0, 0)',
  },
  dayActive: {
    backgroundColor: 'steelblue',
  }
});
console.log(styles);


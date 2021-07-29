import { lensProp, not, over, pipe, __ } from 'ramda';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppDispatch, Day, WeekDay } from '../../../react-app-env';
import { findAndMerge } from '../../utils';
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


const Circle = (props: any) => {
  const size = props.size || 40;
  const style = {
    borderRadius: size / 2,
    backgroundColor: !props.active ? 'rgb(255, 255, 255)' : 'steelblue',
    justifyContent:'center',
    alignItems:'center',
    width: size,
    height: size,
    margin: 1,
  };
  return <View style={style}>{props.children}</View>;
};
export const WeekDays = ({ value, onChange }: WeekDay): JSX.Element => (
  <View style={styles.container}>
    { 
      value.map((
        day: Day, idx: number
      ) => <TouchableOpacity
        // style={[styles.day, day.active && styles.dayActive]}
        onPress={()=> setDay(
          day,
          value,
          onChange
        )
        }>
        <Circle key={ idx } active={day.active}><Text>{day.abbr}</Text></Circle>
      </TouchableOpacity>)
    }
  </View>
)
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    height: 100 
  },
  day: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    alignContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 50,
    borderWidth: 1,
    fontSize: 35,
    borderColor: 'rgb(0, 0, 0)',
  },
  dayActive: {
    backgroundColor: 'steelblue',
  }
});

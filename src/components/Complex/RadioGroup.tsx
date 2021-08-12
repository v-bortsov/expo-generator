// import { Card, InputNumber, Radio, Select } from 'antd'
import { always, cond, equals, is, isNil, map, paths, pipe, values, zipObj } from 'ramda'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  setLimit } from '../../features/generator/generatorSlice'
import { ColumnType } from '../../../react-app-env'
import { Radio, Center, NativeBaseProvider, useContrastText } from 'native-base'
import { View, Text } from 'react-native'
import {Select} from '../Primitives/CustomPicker'
import Slider from '@react-native-community/slider';
import { RootState } from '../../store'

const options = [{ label: 'All', value: 'all' }, { label: 'Slice', value: 'limit' }, { label: 'By Column', value: 'column' }]
export const spotGroupType = cond([[is(Number), always('limit')], [is(String), always('column')], [isNil, always('all')]])
export default function RadioGroup (): JSX.Element {
  const { limiting: limit, columns} = useSelector((state: RootState) => state.generator)
  const dispatch = useDispatch()
  const [group, setGroup] = useState(spotGroupType(limit))

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Radio.Group
        name="myRadioGroup"
        value={group}
        aria-label="myRadioGroup"
        onChange={(value: any): void => {
          if (value === 'all') {
            dispatch(setLimit(null)) 
          } setGroup(value) 
        }}
      >
        {map(
          (v: any): JSX.Element=> <Radio _text={{ color: useContrastText('emerald.700') }} aria-labelledby={v.label} key={v.value} value={v.value} my={1}>{v.label}</Radio>,
          options
        )}
      </Radio.Group>
      <View style={{width: 200}} aria-label="myRadioGroup">
        {equals(
          'limit',
          group
        ) && 
          <View>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              step={1}
              // value={limit}
              maximumValue={100}
              minimumTrackTintColor="#ff0000"
              maximumTrackTintColor="#000000"
              onValueChange={ (value: any) => dispatch(setLimit(value)) }
            />
            <Text>
              Starts: {limit}
            </Text>
          </View>
        }
      
        {equals(
          'column',
          group
        ) && 
          <Select
            defaultValue="All"
            aria-labelledby={'select'}
            onChange={ (value: string) => dispatch(setLimit(value)) }
            style={ { width: 120 } }
            options={pipe(map(pipe(
              paths([['label', 'value'], ['name', 'value']]),
              zipObj(['label', 'value'])
            )))(columns)}
          />
        }
      </View>
    </View>
  )
}

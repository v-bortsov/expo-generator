// import { Card, InputNumber, Radio, Select } from 'antd'
import { always, cond, equals, is, isNil, map, paths, pipe, values, zipObj } from 'ramda'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectColumns, selectLimiting, setLimit } from '../features/generator/generatorSlice'
import { ColumnType } from '../../react-app-env'
import { RadioButton } from 'react-native-paper';
import { View, Text } from 'react-native'
import {Select} from '../components/CustomPicker'
import Slider from '@react-native-community/slider';
// import { ColumnType } from '../global'

// const { Option } = Select

const options = [{ label: 'All', value: 'all' }, { label: 'Slice', value: 'limit' }, { label: 'By Column', value: 'column' }]
export const spotGroupType = cond([[is(Number), always('limit')], [is(String), always('column')], [isNil, always('all')]])
export function RadioGroup (): JSX.Element {
  const limit = useSelector(selectLimiting)
  const columns = useSelector(selectColumns)
  const dispatch = useDispatch()
  const [group, setGroup] = useState(spotGroupType(limit))

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <RadioButton.Group
        onValueChange={(value: any): void => {
          if (value === 'all') {
            dispatch(setLimit(null)) 
          } setGroup(value) 
        }}
        value={group}>
        {map(
          (v: any): JSX.Element=> <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton value={v.value} />
            <Text>{v.label}</Text>
          </View>,
          options
        )}
      </RadioButton.Group>
      <View>
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

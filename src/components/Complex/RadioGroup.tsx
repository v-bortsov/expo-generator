import Slider from '@react-native-community/slider'
import { always, cond, is, isNil } from 'ramda'
import React from 'react'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setLimit } from '../../features/generator/generatorSlice'
import { RootState } from '../../store'

export const spotGroupType = cond([[is(Number), always('limit')], [is(String), always('column')], [isNil, always('all')]])
export default function RadioGroup (): JSX.Element {
  const { limiting: limit, columns} = useSelector((state: RootState) => state.generator)
  const dispatch = useDispatch()
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
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
    </View>
  )
}

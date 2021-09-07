import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  Box, IconButton,
  Stagger as Stagg, useDisclose
} from 'native-base'
import { always, assocPath, chain, clone, complement, converge, curry, hasPath, indexBy, lensPath, map, mergeRight, objOf, over, path, pipe, prop, propEq, when } from 'ramda'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { staggerButtons } from '../../constants/Fields'
import { createColumn } from '../../features/generator/generatorSlice'
import { selectByType, uuidv4 } from '../../utils'

const defaultValueToValue = map(when(
  complement(propEq(
    'name',
    'startDay'
  )),
  converge(
    mergeRight,
    [
      clone, pipe(
        prop('defaultValue'),
        objOf('value')
      )
    ]
  )
))
const actionByAdd = (dispatch: any)=> pipe(
  chain(
    curry((
      acc: any, name: string
    )=>assocPath(
      ['type', 'value'],
      name,
      acc
    )),
    pipe(
      selectByType,
      defaultValueToValue,
      indexBy(prop('name'))
    )
  ),
  // timestampToMoment,
  over(
    lensPath(['name', 'value']),
    uuidv4
  ),
  converge(
    assocPath(['label', 'value']),
    [path(['name', 'value']), clone]
  ),
  when(
    hasPath(['limit', 'value']),
    over(
      lensPath(['limit', 'value']),
      always(10)
    )
  ),
  createColumn,
  dispatch
)
export default ({ setAdd}: any): JSX.Element => {
  const { isOpen, onToggle } = useDisclose()
  const dispatch= useDispatch()

  // const onPressIcon = actionAndSetAdd(
  //   dispatch,
  //   setAdd
  // )
  return (
    <View style={styles.abs}>
      <Box> 
        <Box>
          <Stagg
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                useNativeDriver: false,
                type: 'spring',
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
              
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            {staggerButtons.map((
              {backgroundColor, icon, type}: any, k: number
            )=>(<IconButton
              style={{backgroundColor}}
              key={k}
              mb={4}
              variant="solid"
              rounded="full"
              icon={<MaterialCommunityIcons color="#fff" size={36} name={icon} />}
              onPress={()=>actionByAdd(dispatch)(type)}
            />))}
          </Stagg>
        </Box>
        <IconButton
          variant="solid"
          rounded="full"
          size="md"
          onPress={onToggle}
          icon={<MaterialCommunityIcons size={36} name="plus" />}
        >
        Press me
        </IconButton>
        </Box> 
    </View>
  )
}
const styles = StyleSheet.create({
  abs: {
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  bottom: 80,
  right: 20,
  zIndex: 100,
  // width: 100,
  // height: 100,
  flex: 1,
  justifyContent: 'flex-end'
}})
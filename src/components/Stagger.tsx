import React from 'react'
import {
  Box,
  useDisclose,
  IconButton,
  Stagger as Stagg,
  Center,
  NativeBaseProvider
} from 'native-base'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { always, assoc, assocPath, chain, clone, complement, converge, curry, hasPath, identity, indexBy, lensPath, map, mergeRight, objOf, over,  path,  pipe, prop, propEq, tap, when, __ } from 'ramda'
import { selectByType, timestampToMoment } from '../utils/form'
import { useDispatch } from 'react-redux'
import { createColumn } from '../features/generator/generatorSlice'

// const actionAndSetAdd = curry((
//   dispatch: any, setAdd: any, name: string
// ) => pipe(
//   objOf('value'),
//   assoc(
//     'name',
//     'type'
//   ),
//   tap(()=>setAdd(true)),
//   dispatch
// )(name))
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }
  );
}

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
  timestampToMoment,
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
          <IconButton
            mb={4}
            variant="solid"
            rounded="full"
            icon={<MaterialCommunityIcons size={24} name="calendar-today" />}
            onPress={()=>actionByAdd(dispatch)('dates')}
          />
          <IconButton
            mb={4}
            variant="solid"
            rounded="full"
            onPress={()=>actionByAdd(dispatch)('integer')}
            icon={<MaterialCommunityIcons size={24} name="format-list-numbered" />}
          />
          <IconButton
            mb={4}
            variant="solid"
            rounded="full"
            onPress={()=>actionByAdd(dispatch)('dictionary')}
            icon={<MaterialCommunityIcons size={24} name="database" />}
          />
          <IconButton
            mb={4}
            variant="solid"
            rounded="full"
            onPress={()=>actionByAdd(dispatch)('custom')}
            icon={<MaterialCommunityIcons size={24} name="playlist-plus" />}
          />
        </Stagg>
      </Box>
      <IconButton
        variant="solid"
        rounded="full"
        size="lg"
        onPress={onToggle}
        icon={<MaterialCommunityIcons size={24} name="plus" />}
      >
        Press me
      </IconButton>
    </Box>
  )
}
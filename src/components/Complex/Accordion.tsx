import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Accordion, Box, IconButton } from 'native-base';
import { addIndex, always, clone, cond, converge, indexBy, keys, map, objOf, path, pathEq, pick, pipe, prop, T, values } from 'ramda';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, Pressable, Text, View } from 'react-native';
import { height } from 'styled-system';
import { Field } from '../../../react-app-env';
import { staggerButtons } from '../../constants/Fields';
import { setLimit } from '../../features/generator/generatorSlice';
import Fields from './AddColumn';
import { SlideUpView } from './List';

export function Summary({circle, name, label, editColumn, dispatch, item, idx}: any): JSX.Element{ 
  const [open, setOpen] = useState(false)
  const animationHeight = useRef(new Animated.Value(0)).current;
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  const collapseView = () => {
    Animated.timing(
      animationHeight,
      {
        duration: 250,
        easing: Easing.back(1),
        toValue: 0,
        useNativeDriver: false
      }
    )
      .start();
  }

  const expandView = () => {
    Animated.timing(
      animationHeight,
      {
        duration: 250,
        easing: Easing.back(1),
        toValue: 1,
        useNativeDriver: false
      }
    )
      .start();
  }

  useEffect(
    () => {
      if (!open) {
        collapseView()
      } else {
        expandView()
      }
      console.log(animationHeight);
      
    },
    [open]
  );
  return (
    <View>
      <Pressable  onPress={()=> setOpen(!open)} style={{flex: 1,  flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#a5f3fc'}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between'}}>
          <IconButton
            mb={4}
            backgroundColor={circle.backgroundColor}
            variant="solid"
            rounded="full"
            icon={<MaterialCommunityIcons size={36} name={circle.icon} />}
            // onPress={()=>actionByAdd(dispatch)(i.action)}
          />
        </View>
        <View style={{flex: 1, flexGrow: 4, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex=start', alignContent: 'space-between'}}>
          <View><Text>{label}</Text></View>
          <View><Text>{label}</Text></View>
        </View>
        <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between'}}>
          <IconButton
            mb={4}
            backgroundColor={name===editColumn ? '#e8e32e' : ''}
            onPress={ () => dispatch(setLimit(name)) }
            variant="solid"
            rounded="full"
            icon={<MaterialCommunityIcons size={36} name="key-variant" />}
          />
        </View>
        <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
          <Animated.View
            style={{
              transform: [
                { 
                  rotate: animationHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                    extrapolate: 'clamp',
                  })
                }
              ]
            }}>
            <MaterialCommunityIcons size={48} name='chevron-down' />
          </Animated.View>
        </View>
      </Pressable>
      <Animated.View
        style={{height: animationHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
          extrapolate: 'clamp',
        }), overflow: 'hidden', backgroundColor: '#0891b2'}}>
        <Fields {...{state: pickFieldsByType(item), dispatch, idx}}/>
      </Animated.View>
    </View>
  )
}
const getIconByType = (item: Field)=> pipe(
  indexBy<any,any>(prop('type')),
  prop(path(
    ['type', 'value'],
    item
  ))
)(staggerButtons)

const pickFieldsByType = pipe(
  converge(
    pick,
    [
      cond([
        [
          pathEq(
            ['type', 'value'],
            'custom'
          ), always(['collect'])
        ], [
          pathEq(
            ['type', 'value'],
            'dates'
          ),always(['days', 'startDay', 'limit'])
        ], [
          pathEq(
            ['type', 'value'],
            'integer'
          ),always(['from-to', 'length'])
        ], [T, keys]
      ]), clone
    ]
  ),
  values,
  objOf('fields'),
)

export const SlideAccordion = ({items, dispatch, editColumn}: any)=> <FlatList
  keyExtractor={(item) => item}
  data={items}
  renderItem={({ item, index: idx }) => (
    // <SlideUpView>
    <Summary
      idx={idx}
      dispatch={dispatch}
      editColumn={editColumn}
      circle={getIconByType(item)}
      label={path(
        ['label', 'value'],
        item
      )}
      name={path(
        ['name', 'value'],
        item
      )}
      item={item}
    />
    // </SlideUpView>
  )}
/>

export default function AccordionComponent({items, dispatch, editColumn}: any) {
  return (
    <Box m={3}>
      <Accordion allowMultiple>     
        {addIndex(map)(
          (
            item: any, idx: number
          ) => <Accordion.Item key={idx}>
            <Accordion.Summary backgroundColor="orange.300" >
              <Summary
                dispatch={dispatch}
                editColumn={editColumn}
                circle={getIconByType(item)}
                label={path(
                  ['label', 'value'],
                  item
                )}
                name={path(
                  ['name', 'value'],
                  item
                )}
              />
            </Accordion.Summary>
            <Accordion.Details>
              <Fields key={`${idx}_fields`} {...{state: pickFieldsByType(item), dispatch, idx}}/>
            </Accordion.Details>
          </Accordion.Item>
          ,
          items
        )}
      </Accordion>
    </Box>
  );
}
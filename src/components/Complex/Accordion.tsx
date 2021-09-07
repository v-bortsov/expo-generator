import { MaterialCommunityIcons } from '@expo/vector-icons';
import { always, clone, cond, converge, indexBy, keys, objOf, path, pathEq, pick, pipe, prop, T, values } from 'ramda';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Field } from '../../../react-app-env';
import { staggerButtons } from '../../constants/Fields';
import { changeColumnByName, setLimit } from '../../features/generator/generatorSlice';
import Collapse from '../Effects/Collapse';
import Fields from './AddColumn';
import IconButton from '../../components/Complex/IconButton'
import { theme } from '../../constants/Colors'
import {TextInputHover} from '../Primitives/TextInput'
import Hoverable from '../Primitives/Hoverable';
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


const Header = ({circle, label, name, editColumn, dispatch, idx}: any)=>{
    
    return (<>
      <View style={styles.leftSummary}>
        <MaterialCommunityIcons size={36} name={circle.icon} />
      </View>
      <View style={styles.titleSummary}>
        <TextInputHover text={name} fontSize={20} onChange={(value: string)=>dispatch(changeColumnByName({path: [idx, 'name', 'value'], value}))}/>
        <TextInputHover text={label} fontSize={15} onChange={(value: string)=>dispatch(changeColumnByName({path: [idx, 'label', 'value'], value}))}/>
      </View>
      <View style={styles.keyIconSummary}>
        <MaterialCommunityIcons color={name===editColumn ? '#e8e32e' : ''} onPress={ () => dispatch(setLimit(name)) } style={{margin: 0}} size={36} name="key-variant" />
      </View>
    </>)
}
export default ({items, dispatch, editColumn, style}: any)=> <FlatList
  keyExtractor={(item) => item} 
  data={items}
  style={style}
  extraData={items}
  renderItem={({ item, index: idx }) => (
    // <SlideUpView>
    <Collapse
      idx={idx}
      duration={200}
      header={<Header key={`header_${idx}`} {...{idx, dispatch, circle: getIconByType(item), label: path(['label', 'value'], item), name: path(['name', 'value'], item), editColumn}} />}
      icon={<MaterialCommunityIcons key={`icon_${idx}`} size={48} name='chevron-down' />}
      borderStyle={{ borderBottomColor: theme.colors.bg, borderBottomWidth: StyleSheet.hairlineWidth }}
      backgroundColor={theme.colors.primary}
    >
      <Fields {...{state: pickFieldsByType(item), dispatch, idx}} />
    </Collapse>
    // </SlideUpView>
  )}
/>

const parentMargin = {marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: -5}
const childMargin = {marginTop: 0, marginRight: 0, marginBottom: 5, marginLeft: 5}
const largeFont = {fontSize: 20}
const smallFont = {fontSize: 12}
const styles = StyleSheet.create({
  summary: {flex: 1, overflow: 'hidden',  flexDirection: 'row', justifyContent: 'space-around', backgroundColor: theme.colors.primary, ...parentMargin},
  leftSummary: {justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between', ...childMargin},
  titleSummary: {flex: 1, flexGrow: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start', alignContent: 'space-around', ...childMargin},
  keyIconSummary: {flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between', ...childMargin},
  bottomField: {...smallFont}
})
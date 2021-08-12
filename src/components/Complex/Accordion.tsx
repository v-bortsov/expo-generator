import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton } from 'native-base';
import { always, clone, cond, converge, indexBy, keys, objOf, path, pathEq, pick, pipe, prop, T, values } from 'ramda';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Field } from '../../../react-app-env';
import { staggerButtons } from '../../constants/Fields';
import { setLimit } from '../../features/generator/generatorSlice';
import Collapse from '../Effects/Collapse';
import Fields from './AddColumn';

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
const Header = ({circle, label, name, editColumn, dispatch}: any)=>{
    return (<>
      <View style={styles.leftSummary}>
        <IconButton
          mb={4}
          backgroundColor={circle.backgroundColor}
          variant="solid"
          rounded="full"
          style={{margin: 0}}
          icon={<MaterialCommunityIcons size={36} name={circle.icon} />}
        />
      </View>
      <View style={styles.titleSummary}>
        <View><Text style={styles.topField}>{label}</Text></View>
        <View><Text style={styles.bottomField}>{label}</Text></View>
      </View>
      <View style={styles.keyIconSummary}>
        <IconButton
          mb={4}
          backgroundColor={name===editColumn ? '#e8e32e' : ''}
          onPress={ () => dispatch(setLimit(name)) }
          style={{margin: 0}}
          variant="solid"
          rounded="full"
          icon={<MaterialCommunityIcons size={36} name="key-variant" />}
        />
      </View>
    </>)
}
export default ({items, dispatch, editColumn, style}: any)=> <FlatList
  keyExtractor={(item) => item} 
  data={items}
  style={style}
  renderItem={({ item, index: idx }) => (
    // <SlideUpView>
    <Collapse
      idx={idx}
      duration={200}
      header={<Header key={`header_${idx}`} {...{circle: getIconByType(item), label: path(['label', 'value'], item), name: path(['name', 'value'], item), editColumn}} />}
      summary={<Fields {...{state: pickFieldsByType(item), dispatch, idx}} />}
      icon={<MaterialCommunityIcons key={`icon_${idx}`} size={48} name='chevron-down' />}
      borderStyle={{ borderBottomColor: '#40403f', borderBottomWidth: StyleSheet.hairlineWidth }}
      backgroundColor={'#a5f3fc'}
    />
    // </SlideUpView>
  )}
/>

const parentMargin = {marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: -5}
const childMargin = {marginTop: 0, marginRight: 0, marginBottom: 5, marginLeft: 5}
const largeFont = {fontSize: 24}
const smallFont = {fontSize: 12}
const styles = StyleSheet.create({
  summary: {flex: 1, overflow: 'hidden',  flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#a5f3fc', ...parentMargin},
  leftSummary: {justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between', ...childMargin},
  titleSummary: {flex: 1, flexGrow: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start', alignContent: 'space-around', ...childMargin},
  keyIconSummary: {flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between', ...childMargin},
  topField: {...largeFont},
  bottomField: {...smallFont}
})
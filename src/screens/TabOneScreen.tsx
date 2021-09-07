import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { always, apply, assoc, clone, complement, converge, curry, filter, isNil, join, lensProp, objOf, over, pathEq, pipe, prop, tap, values, when, __ } from 'ramda';
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ActivityIndicator, Animated, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '../components/Themed';
import { editColumn } from '../features/generator/generatorSlice';
import { RootState } from '../store';
import { calcCount, findByNameAndChangeScope, reducerFields } from '../utils';
import Collapse from '../components/Effects/Collapse'
import { RadioGroup, Stagger, IconButton, Accordion, AppBar } from '../components/Complex';
import AccordionFooter from '../components/Complex/AccordionFooter'
import { theme } from '../constants/Colors'
import AnimateNumber from '../components/Effects/AnimateNumber'
const editorColumn = (columns: any)=> pipe<any, any, any, any, any>(
  (name: string)=>filter(pathEq(
    ['name', 'value'],
    name
  )),
  apply(
    __,
    [columns]
  ),
  prop(0),
  values
)
const splitCollectAndDispatch = (
  columns: any, dispatch: any, localDispatch: any
)=>pipe(
  tap(pipe(
    editColumn,
    dispatch
  )),
  prop('name'),
  editorColumn(columns),
  findByNameAndChangeScope(
    'collect',
    over(
      lensProp('value'),
      when(
        complement(isNil),
        join('\n')
      )
    ),
  ),
  objOf('value'),
  assoc(
    'name',
    'updateFields'
  ),
  localDispatch
)
export default function TabOneScreen(obj: any) {
  console.log(
    'obj example:',
    obj
  );
  // const [isAdd, setAdd] = useState(false)
  // const [state, fieldsDispatch]  = converge(
  //   curry(useReducer),
  //   [
  //     always(reducerFields), clone, always(assoc(
  //       'fields',
  //       __,
  //       {}
  //     ))
  //   ]
  // )([])
  const {rows, columns, editColumn: edit, loading: getLoading, editColumn, limiting} = useSelector((state: RootState) => state.generator)
  const i18n = useSelector((state: RootState) => state.i18n)
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={{height: 50}}>
        <AppBar {...{navigation: obj.navigation}} />
      </View>
      <ScrollView>
        <Accordion items={columns} dispatch={dispatch} editColumn={limiting}/>
      </ScrollView>
      <Collapse
        idx={12341}
        duration={200}
        header={<AccordionFooter {...{dispatch, i18n, locale: obj.route?.params?.lang, rows, columns, getLoading, limiting }} />}
        Button={IconButton}
        buttonProps={{
          style: {backgroundColor: theme.colors.dart, color: theme.colors.light},
          startIcon: <MaterialIcons style={{textAlignVertical: 'center'}} size={32} name='settings' color={theme.colors.light}/>,
          children: <AnimateNumber
            value={ useMemo(()=>columns.length<=1 ? 0 : calcCount(columns, limiting), [columns, limiting])}
            interval={26} // in miliseconds
            formatter={(number: any) => parseInt(number)}
            easing={'easeOut'}
          />
        }}
        borderStyle={{flex: 1, flexDirection: 'column'}}
      >
        <Text>
          <Animated.View>
            {/* {countAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [0, columns.length<=1 ? 0 : calcCount(columns, limiting)]
            })} */}
            <RadioGroup/>
          </Animated.View>
        </Text>
      </Collapse>
      <Stagger />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  groupButtons:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  submit: {
    backgroundColor: 'rgb(19, 204, 98)'
  },
  content: {
    flex: 1,
    flexGrow: 1
  },
  footer: {
    flexShrink: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    textAlignVertical: 'center',
    margin: 10
  }
});

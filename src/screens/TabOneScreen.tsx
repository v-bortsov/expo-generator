import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { always, apply, assoc, clone, complement, converge, curry, filter, isNil, join, lensProp, objOf, over, pathEq, pipe, prop, tap, values, when, __ } from 'ramda';
import React, { useReducer, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '../components/Themed';
import { editColumn } from '../features/generator/generatorSlice';
import { RootState } from '../store';
import { calcCount, findByNameAndChangeScope, reducerFields } from '../utils';
import Collapse from '../components/Effects/Collapse'
import { RadioGroup, Stagger, IconButton, Accordion } from '../components/Complex';
import AccordionFooter from '../components/Complex/AccordionFooter'

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
  // console.log(state);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Accordion items={columns} dispatch={dispatch} editColumn={limiting}/>
      </ScrollView>
      <Collapse
        idx={12341}
        duration={200}
        header={<AccordionFooter {...{dispatch, i18n, locale: obj.route?.params?.lang, rows, columns, getLoading, limiting }} />}
        summary={<Text>{`testify`}</Text>}
        Button={IconButton}
        buttonProps={{
          style: {backgroundColor: '#000', color: '#fff'},
          startIcon: <MaterialIcons style={{textAlignVertical: 'center'}} size={32} name='settings' color='#fff'/>,
          children: columns.length<=1 ? '0' : calcCount(columns, limiting)
        }}
        borderStyle={{flex: 1, flexDirection: 'column'}}
      />
      <Stagger />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  safearea: {
    flexGrow: 1,
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

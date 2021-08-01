import { FontAwesome } from '@expo/vector-icons';
import { always, apply, assoc, clone, complement, converge, curry, filter, isEmpty, isNil, join, lensProp, objOf, over, path, pathEq, pipe, prop, tap, values, when, __ } from 'ramda';
import React, { useReducer, useState } from 'react';
import { ActivityIndicator, Alert, Button, Modal, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { flexShrink, style } from 'styled-system';
import { AppBar, CollectList, Fields, RadioGroup, Stagger} from '../components/Complex';
import {SlideAccordion } from '../components/Complex/Accordion'
import { View } from '../components/Themed';
import { changeColumn, createColumn, editColumn, loading, removeColumn, run, thunkCartesianCalc } from '../features/generator/generatorSlice';
import { RootState } from '../store';
import { calcCount, downloadObjectAsJson, findByNameAndChangeScope, isAllFieldsCheck, onFinish, reducerFields } from '../utils';
// import MultiSlider from '@ptomasroos/react-native-multi-slider'
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
export default function TabOneScreen({navigation}) {
  // console.log(
  //   'obj example:',
  //   obj
  // );
  const [isAdd, setAdd] = useState(false)
  const [state, fieldsDispatch]  = converge(
    curry(useReducer),
    [
      always(reducerFields), clone, always(assoc(
        'fields',
        __,
        {}
      ))
    ]
  )([])
  const {rows, columns, editColumn: edit, loading: getLoading, editColumn, limiting} = useSelector((state: RootState) => state.generator)
  const dispatch = useDispatch()

  console.log(state);
  
  return (
    <View style={{flex: 1}}>
      <View>
        <AppBar {...{setAdd, fieldsDispatch, navigation}}/>
      </View>
      <ScrollView>
        {/* <View style={styles.content}> */}
        
        
        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={!isNil(edit)||isAdd||false}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
          }}
        >
          <Fields {...{state, dispatch: fieldsDispatch}} />
          <View
            style={styles.groupButtons}>
            <Button
              onPress={
                ()=>{
                  dispatch(editColumn({name: null}))
                  setAdd(false)
                }
              }
              title={'Cancel'}
              color="#fc929e"
            />
            <Button
              disabled={isAllFieldsCheck(state.fields)}
              onPress={pipe(
                ()=> onFinish(
                  dispatch,
                  state,
                  isNil(edit) ? createColumn : changeColumn
                ),
                tap(()=>setAdd(false))
              )
              }
              color={'#07c19b'}
              title={isNil(editColumn) ? 'Add' : 'Save'}
            />
          </View>
        </Modal>
        <Accordion items={columns} dispatch={dispatch} editColumn={limiting}/> */}
      
        <SlideAccordion items={columns} dispatch={dispatch} editColumn={limiting}/>
        {/* <CollectList
          style={{flex: 1}}
          collect={columns}
          removeColumn={pipe(
            removeColumn,
            dispatch
          )}
          editColumn={
            splitCollectAndDispatch(
              columns,
              dispatch,
              fieldsDispatch
            )
          }
          transformItem={{
            label: path(['label', 'value']),
            type: path(['type', 'value']),
            name: path(['name', 'value']),
            item: clone,
            length: path(['collect', 'value', 'length'])
          }}
        /> */}
        
      </ScrollView>
      {/* <RadioGroup/> */}
       
      <View>
        <View style={[styles.row]}>
          <Stagger {...{setAdd, fieldsDispatch}} />
          <FontAwesome.Button
            name="gamepad"
            backgroundColor="#06bcee"
            disabled={columns.length<=1||getLoading}
            onPress={
              () => {
                dispatch(loading(true))
                dispatch(thunkCartesianCalc())
                  .then((row: any)=>{
                    dispatch(run(row.payload))
                  });
              }
            }>
            <Text>Run ({columns.length<=1 ? 0 : calcCount(
              columns,
              limiting
            )})</Text>
            {
              getLoading &&
            <ActivityIndicator animating={true} color="#c62828" />}
          </FontAwesome.Button>
        
          <FontAwesome.Button
            name="cloud-download"
            backgroundColor={isEmpty(rows) ? 'grey' : '#3b5998'}
            disabled={isEmpty(rows)}
            onPress={()=> downloadObjectAsJson(
              rows,
              'testify'
            )}>
          Download
          </FontAwesome.Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: Dimensions.get('window').height / 3,
  // },
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
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
    // paddingTop: StatusBar.currentHeight,
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

import { FontAwesome } from '@expo/vector-icons';
import { always, apply, assoc, clone, complement, converge, curry, filter, isEmpty, isNil, join, lensProp, over, path, pathEq, pipe, prop, tap, values, when, __ } from 'ramda';
import React, { useReducer, useState } from 'react';
import { ActivityIndicator, Alert, Button, Modal, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FormFields } from '../components/AddColumn';
import AppBar from '../components/AppBar';
import { CollectList } from '../components/List';
import { RadioGroup } from '../components/RadioGroup';
import Stagger from '../components/Stagger';
import { View } from '../components/Themed';
import { changeColumn, createColumn, editColumn, loading, removeColumn, run, selectColumns, selectEditColumn, selectLimiting, selectLoading, selectRows, thunkCartesianCalc } from '../features/generator/generatorSlice';
import { downloadObjectAsJson } from '../utils/dom';
import { onFinish } from '../utils/form';
import { reducerFields } from '../utils/hook';
import { calcCount, findByNameAndChangeScope } from '../utils/popular';
import { isAllFieldsCheck } from '../utils/validate';
// import MultiSlider from '@ptomasroos/react-native-multi-slider'
const getItemByNestedValue = (name: string)=>filter(pathEq(
  ['name', 'value'],
  name
))
const editorColumn = (columns: any)=> pipe<any, any, any, any, any>(
  getItemByNestedValue,
  apply(
    __,
    [columns]
  ),
  prop(0),
  values
)
export default function TabOneScreen() {
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
  const dispatch = useDispatch()
  const rowsFromState = useSelector(selectRows);
  const columns = useSelector(selectColumns)
  const edit = useSelector(selectEditColumn)
  const getLoading = useSelector(selectLoading)
  const limiting = useSelector(selectLimiting)
  console.log(state);
  
  return (
    <View style={{flex: 1}}>

      <View style={styles.abs}>
        <Stagger {...{setAdd, fieldsDispatch}} />
      </View>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <AppBar {...{setAdd, fieldsDispatch}}/>
        {/* <MultiSlider
          min={0}
          max={10}
          values={[0]}

        /> */}
        <RadioGroup/>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={!isNil(edit)||isAdd||false}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
          }}
        >
          <FormFields {...{state, fieldsDispatch}} />
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
              // style={styles.submit}
              color={'#07c19b'}
              title={isNil(edit) ? 'Add' : 'Save'}
            />
          </View>
        </Modal>
        <CollectList
          style={{flex: 1}}
          collect={columns}
          removeColumn={pipe(
            removeColumn,
            dispatch
          )}
          editColumn={(objColumn: string)=> {
            pipe(
              editColumn,
              dispatch
            )(objColumn)

            fieldsDispatch({
              name: 'updateFields',
              value: findByNameAndChangeScope(
                'collect',
                over(
                  lensProp('value'),
                  when(
                    complement(isNil),
                    join('\n')
                  )
                ),
              )(editorColumn(columns)(objColumn.name))
            })
          }}
          transformItem={{
            label: path(['label', 'value']),
            type: path(['type', 'value']),
            name: path(['name', 'value']),
            item: clone,
            length: path(['collect', 'value', 'length'])
          }}
        />
      </ScrollView>

      <View style={[styles.row]}>
        <FontAwesome.Button
          name="gamepad"
          backgroundColor="#06bcee"
          disabled={columns.length<=1||getLoading}
          onPress={
            () => {
              dispatch(loading(true))
              dispatch(thunkCartesianCalc())
                .then((rows: any)=>{
                  dispatch(run(rows.payload))
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
          backgroundColor={isEmpty(rowsFromState) ? 'grey' : '#3b5998'}
          disabled={isEmpty(rowsFromState)}
          onPress={()=> downloadObjectAsJson(
            rowsFromState,
            'testify'
          )}>
          Download
        </FontAwesome.Button>
        
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
  button: {
    textAlignVertical: 'center',
    margin: 10
  },
  abs: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    bottom: 20,
    right: 20,
    zIndex: 100,
    flex: 1,
    justifyContent: 'flex-end'
  }
});

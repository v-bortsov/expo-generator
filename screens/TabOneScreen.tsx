import { Badge, Button, Flex, List, Modal, Provider, WingBlank } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import { always, apply, assoc, clone, converge, curry, filter, isEmpty, isNil, join, lensProp, map, over, path, pathEq, pipe, product, prop, values, __ } from 'ramda';
import React, { useReducer, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FormFields } from '../components/AddColumn';
import { CollectList } from '../components/List';
import { View } from '../components/Themed';
import { unionFields } from '../constants/Fields';
import { changeColumn, clearEditColumn, createColumn, editColumn, fetchUserById, loading, removeColumn, run, selectColumns, selectEditColumn, selectLoading, selectRows } from '../features/generator/generatorSlice';
import { downloadObjectAsJson } from '../utils/dom';
import { onFinish } from '../utils/form';
import { reducerFields } from '../utils/hook';
import { findByNameAndChangeScope } from '../utils/popular';

const Circle = (props: any) => {
  const size = props.size || 20;
  const style = {
    borderRadius: size / 2,
    backgroundColor: '#527fe4',
    justifyContent:'center',
    alignItems:'center',
    width: size,
    height: size,
    margin: 1,
  };
  return <View
    style={style}>{props.children}</View>;
};

const calcCount = pipe<any,any,any>(
  map(path(['collect', 'length'])),
  product
)
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
  const dispatch = useDispatch()
  const rowsFromState = useSelector(selectRows);
  const columns = useSelector(selectColumns)
  const [isAdd, setAdd] = useState(false)
  const edit = useSelector(selectEditColumn)
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
  return (
    <Provider
      style={styles.container}>
      <View>
        <Modal
          popup
          visible={!isNil(edit)||isAdd||false}
          animationType="slide-up"
        >
          {FormFields([state, fieldsDispatch]) }
          <View
            style={styles.groupeButtons}>
            <Button
              onPress={
                ()=>{
                  dispatch(clearEditColumn({edit: false}))
                  setAdd(false)
                }
              }
              type="warning">
              Cancel
            </Button>
            <Button
              onPress={
                ()=> onFinish(
                  dispatch,
                  state,
                  isNil(edit) ? createColumn : changeColumn
                )
              }
              style={styles.submit}
            >
              {isNil(edit) ? 'Add' : 'Save'}
            </Button>
          </View>
        </Modal>

        <CollectList
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
            // console.log(editorColumn(columns)(objColumn.name));
            fieldsDispatch({
              name: 'updateFields',
              value: findByNameAndChangeScope(
                'collect',
                over(
                  lensProp('value'),
                  join('\n')
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
          CreationItem={
            <List.Item
              extra={
                <Ionicons
                  name="add-circle"
                  onPress={()=>{
                    fieldsDispatch({
                      name: 'updateFields',
                      value: unionFields.slice(
                        0,
                        1
                      ) 
                    })
                    setAdd(true)
                  }}
                  color="green"
                  size={16} />
              } />   
          } 
        />
        <WingBlank
          style={{ marginBottom: 5 }}>
          <Flex
            justify="around">
            <Badge
              text={calcCount(columns)}
              overflowCount={1000000}>
              <Button
                loading={useSelector(selectLoading)}
                onPress={
                  () => {
                    dispatch(loading(true))
                    dispatch(fetchUserById(123))
                      .then((rows: any[])=>{
                        dispatch(run(rows))
                      });
                  }
                }
                type="primary"><Ionicons
                  name="play"
                  size={32} /> RUN
              </Button>
            </Badge>
            <Button
              style={styles.button}
              onPress={
                ()=> downloadObjectAsJson(
                  rowsFromState,
                  'testify'
                )
              }
              disabled={isEmpty(rowsFromState)}> <Ionicons
                name="cloud-download"
                size={32} /> Download</Button>
          </Flex>
        </WingBlank>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupeButtons:{
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
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  button: {
    textAlignVertical: 'middle',
    margin: '10px'
  }
});

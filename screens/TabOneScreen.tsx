import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Platform } from 'react-native';
import { Button, Flex, WingBlank, Badge, Toast, Accordion, WhiteSpace, Provider, List, Modal } from '@ant-design/react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { run, loading, selectColumns, selectRows, selectLoading, fetchUserById, editColumn, removeColumn, clearEditColumn } from '../features/generator/generatorSlice';
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, keys, map, values, pipe, path, product, tap, none, propEq, find } from 'ramda';
import { Ionicons, createIconSet, FontAwesome  } from '@expo/vector-icons';
import { ColumnType } from '../react-app-env';
import flex from '@ant-design/react-native/lib/flex';
import { Brief } from '@ant-design/react-native/lib/list/ListItem';
import { AddColumn } from '../components/AddColumn';
import { from } from '@apollo/client';
import { buildFields, unionFields } from '../utils/form';
const glyphMap = { 'icon-name': 1234, test: '∆' };
const CustomIcon = createIconSet(
  glyphMap,
  'FontName',
  'custom-icon-font.ttf'
);
const Row = (props: any) => (
  <View style={styles.row}>
    <Text style={styles.text}>
      {`${props.city}`}
    </Text>
  </View>
);
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
  return <View style={style}>{props.children}</View>;
};
function downloadObjectAsJson(
  exportObj: any[], exportName: string
): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute(
    'href',
    dataStr
  );
  downloadAnchorNode.setAttribute(
    'download',
    exportName + '.json'
  );
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
function showToastNoMask() {
  Toast.info(
    'Toast without mask !!!',
    1,
    undefined,
    false
  );
}
const calcCount = pipe<any,any,any>(
  map(path(['collect', 'length'])),
  product
)

export default function TabOneScreen() {
  const dispatch = useDispatch()
  const rowsFromState = useSelector(selectRows);
  const columns = useSelector(selectColumns)
  const [isAdd, setAdd] = React.useState(false)
  // const columns = useSelector(selectColumns);
  console.log(Platform);
  return (
    <Provider style={styles.container}>
      <View>
        {/* <Text style={styles.title}>Tab One#23322</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
        {/* <WingBlank> */}
        <Modal
          popup
          visible={isAdd||!none(
            propEq(
              'edit',
              true
            ),
            columns
          )}
          animationType="slide-up"
        >
          <AddColumn fields={isAdd ? unionFields.slice(
            0,
            1
          ) : pipe(
            find(propEq(
              'edit',
              true
            )),
            buildFields,
            tap(x => console.log(
              'checkitout',
              x
            ))
          )(columns)} />
          {/* <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <Text style={{ textAlign: 'center' }}>Content...</Text>
          <Text style={{ textAlign: 'center' }}>Content...</Text>
        </View> */}
          <Button onPress={()=>{
            dispatch(clearEditColumn({edit: false}))
            setAdd(false)
          }} type="primary">
          close
          </Button>
        </Modal>
        <List>
          <List.Item extra={<Ionicons name="add-circle" onPress={()=>setAdd(true)} color="green" size={16} />}/>
          {columns.map((i: ColumnType<null>)=> (
            <List.Item extra={<>
              <Brief style={{ textAlign: 'right' }}>{i.type} ({i.collect.length})</Brief>
              <Ionicons name="remove-circle" onPress={()=>dispatch(removeColumn(i))} color="red" size={16} />
              <Ionicons onPress={()=>dispatch(editColumn({name: i.name, edit: true}))} name="pencil" color="grey" size={16} />
            </>}>{i.label}</List.Item>
          ))}
        </List>
        <WingBlank style={{ marginBottom: 5 }}>
          <Flex justify="around">
            <Badge text={calcCount(columns)} overflowCount={1000000}>
              <Button loading={useSelector(selectLoading)} onPress={() => {
                dispatch(loading(true))
                dispatch(fetchUserById(123))
                  .then(rows=>{
                    dispatch(run(rows))
                  });
              }} type="primary"><Ionicons name="play" size={32} /> RUN
              </Button>
            </Badge>
            <Button style={styles.button} onPress={()=>{
              downloadObjectAsJson(
                rowsFromState,
                'testify'
              )
            }} disabled={isEmpty(rowsFromState)}> <Ionicons name="cloud-download" size={32} /> Download</Button>
          </Flex>
        </WingBlank>
        {/* <SafeAreaView style={styles.row}>
          <ScrollView  style={styles.scrollView}>
            {rows.map((props)=><Row {...props} />)}
          </ScrollView >
        </SafeAreaView> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
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

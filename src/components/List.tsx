// import { List } from '@ant-design/react-native';
// import { Brief } from '@ant-design/react-native/lib/list/ListItem';
import { Ionicons } from '@expo/vector-icons';
import { applySpec, map, mergeRight, pipe, prepend, tap } from 'ramda';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { DataTable } from 'react-native-paper';

const ANIMATION_DURATION = 250;
const ROW_HEIGHT = 70;
// const rowStyles = [
//   styles.row,
//   { opacity: this._animated },
//   {
//     transform: [
//       { scale: this._animated },
//       {
//         rotate: this._animated.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['35deg', '0deg'],
//           extrapolate: 'clamp',
//         })
//       }
//     ],
//   },
//   {
//     // NEW CODE
//     height: this._animated.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, ROW_HEIGHT],
//       extrapolate: 'clamp',
//     }),
//   },
// ];

const FadeInView = (props: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(
    () => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: false
        }
      )
        .start();
    },
    [fadeAnim]
  )
  const rowStyles = [
    {
      height: ROW_HEIGHT,
    }, {
      height: fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, ROW_HEIGHT],
        extrapolate: 'clamp',
      }),
    }, { opacity: fadeAnim }, {
      transform: [
        { scale: fadeAnim }, {
          rotate: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['35deg', '0deg'],
            extrapolate: 'clamp',
          })
        }
      ],
    },
  ];
  return (
    <Animated.View style={rowStyles}>
      {props.children}
    </Animated.View>
  );
}

export const CollectRow: React.FC<any> =  ({label, type, length, name, item, editColumn, removeColumn}: any)=>(
  <FadeInView>
    <DataTable.Row onPress={()=>editColumn({name, edit: true})}>
      <DataTable.Cell>{label}</DataTable.Cell>
      <DataTable.Cell>{type}</DataTable.Cell>
      <DataTable.Cell numeric>{length}</DataTable.Cell>
      <DataTable.Cell numeric><Ionicons name="remove-circle" onPress={()=>removeColumn(item)} color="red" size={32} /></DataTable.Cell>
    </DataTable.Row>
  </FadeInView>
)
export const CollectListItem: React.FC<any> = ({label, type, length, name, item, editColumn, removeColumn}: any)=>(
  <View style={styles.row} key={name}>
    <View key={`${name}_left`}>
      <Text style={{ textAlign: 'right' }}>{label} {type} ({length})</Text>
    </View>
    <View key={`${name}_right`}>
      <Ionicons name="remove-circle" onPress={()=>removeColumn(item)} color="red" size={16} />
      <Ionicons name="pencil" onPress={()=>editColumn({name, edit: true})} color="grey" size={16} />
    </View>
  </View>
  // <List.Item
  //   key={name}
  //   extra={
  //     <>
  //       <Brief style={{ textAlign: 'right' }}>{type} ({length})</Brief>
  //       <Ionicons name="remove-circle" onPress={()=>removeColumn(item)} color="red" size={16} />
  //       <Ionicons onPress={()=>editColumn({name, edit: true})} name="pencil" color="grey" size={16} />
  //     </>
  //   }>
  //   {label}
  // </List.Item>
)

export const CollectList: React.FC<any> = ({collect, removeColumn, editColumn, transformItem}: any)=>(
  <DataTable>
    <DataTable.Header>
      <DataTable.Title>
        Name
      </DataTable.Title>
      <DataTable.Title>Type</DataTable.Title>
      <DataTable.Title numeric sortDirection='descending'>Total</DataTable.Title>
      <DataTable.Title numeric>-</DataTable.Title>
    </DataTable.Header>
    {pipe(map(pipe(
      applySpec(transformItem),
      mergeRight({removeColumn, editColumn}),
      CollectRow
      // (column: any)=> <CollectListItem {...column} />
    )),
      // prepend(CreationItem),
    )(collect)}
  </DataTable>
)

const styles = StyleSheet.create({
  row: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-around'
    // paddingTop: StatusBar.currentHeight,
  },
})
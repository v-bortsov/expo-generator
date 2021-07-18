import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, Icon, Avatar  } from 'native-base';
import { applySpec, map, mergeRight, pipe, prepend, tap } from 'ramda';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';
// import { Avatar as Ava, DataTable } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';

const ANIMATION_DURATION = 250;
const ROW_HEIGHT = 70;

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

// export const CollectRow: React.FC<any> =  ({label, type, length, name, item, editColumn, removeColumn}: any)=>(
//   <FadeInView>
//     <DataTable.Row onPress={()=>editColumn({name, edit: true})}>
//       <DataTable.Cell>{label}</DataTable.Cell>
//       <DataTable.Cell>{type}</DataTable.Cell>
//       <DataTable.Cell numeric>{length}</DataTable.Cell>
//       <DataTable.Cell numeric><Ionicons name="remove-circle" onPress={()=>removeColumn(item)} color="red" size={32} /></DataTable.Cell>
//     </DataTable.Row>
//   </FadeInView>
// )
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

export const CollectList: React.FC<any> = ({collect, removeColumn, editColumn, transformItem}: any)=>{


  const closeRow = (
    rowMap: any, rowKey: any
  ) => {

  };
  const onRowDidOpen = (rowKey: any) => {
    console.log(
      'This row opened',
      rowKey
    );
  };
  return <SwipeListView
    data={pipe(map(pipe(
      applySpec(transformItem),
      mergeRight({removeColumn, editColumn}),
      // CollectRow,
      // (column: any)=> <CollectListItem {...column} />
    )))(collect)}
    renderItem={(
      data, rowMap
    ) => (<FadeInView>
      <Box style={styles.rowFront}>
        <Pressable
          onPress={()=>editColumn({name: data.item.name, edit: true})}
          alignItems='center'
          bg="white"
          borderBottomColor='trueGray.200'
          borderBottomWidth= {1}
          justifyContent='center'
          height={50}
          underlayColor={'#AAA'}
          _pressed={{
            bg:'trueGray.200'
          }}
          py={8}
        >
          <HStack width="100%" px={4}>
            <HStack space={2} alignItems="center">
              <Avatar color="white" bg={'secondary.700'}>
                {'rowMap'}
              </Avatar>
              <Text>
                {data.item.name}
              </Text>
            </HStack>
          </HStack>
        </Pressable>
      </Box>
    </FadeInView>)}
    renderHiddenItem={ (
      data, rowMap
    ) => (
      <View style={styles.rowBack}>
        <Text>Left</Text>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => closeRow(
            rowMap,
            data.item.key
          )}
        >
          <Text style={styles.backTextWhite}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={()=>removeColumn(data.item)}
        >
          <Ionicons name="remove-circle"  color="white" size={32} />
          {/* <Text style={styles.backTextWhite}>Delete</Text> */}
        </TouchableOpacity>
      </View>
    )}
    leftOpenValue={75}
    rightOpenValue={-150}
    previewRowKey={'0'}
    previewOpenValue={-40}
    previewOpenDelay={3000}
    onRowDidOpen={onRowDidOpen}
  />
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-around'
    // paddingTop: StatusBar.currentHeight,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: ROW_HEIGHT,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  }
})
import { MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, Icon, IconButton, StatusBar } from 'native-base';
import * as React from 'react';
import { unionFields } from '../../constants/Fields';
import { View, Text } from '../Themed';
import {StyleSheet} from 'react-native'
import ActionSheet from './ActionSheet'

const ArrowBack = ({navigation}: any)=><View style={{flexDirection: 'row', alignItems: 'center'}}>
  <IconButton icon={<Icon onPress={() => navigation.openDrawer()} size="sm" as={<MaterialIcons name='arrow-back' />} color="white" />} />
  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Here will a uniq title</Text>
</View>
export default function AppBar({setAdd, fieldsDispatch, navigation}: any): JSX.Element{
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ArrowBack {...{navigation}}/>
      </View>
      <View style={styles.item}>
        <ActionSheet/>
        
      </View>
      {/* <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#6200ee" /> */}
      {/* <HStack bg='#6200ee' px={1} py={3} justifyContent='space-between' alignItems='center'>
        <HStack space={4} alignItems='center'>
          <IconButton icon={<Icon size="sm" as={<MaterialIcons name='arrow-back' />} color="white" />} />
          <Text color="white" fontSize={20} fontWeight='bold'>Here will a uniq title</Text>
        </HStack>
        <HStack space={2}>
          <IconButton
            icon={<Icon
              as={<MaterialIcons name='favorite' />}
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
              size='sm'
              color="white" />} />
          <IconButton
            icon={<Icon
              as={<MaterialIcons name='search' />}
              color="white"
              size='sm'  />} />
          <IconButton icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
        </HStack>
      </HStack> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {flex: 1,  flexDirection: 'row', justifyContent: 'space-between', height: 100},
  item: {justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between'},
  titleSummary: {flex: 1, flexGrow: 4, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', alignContent: 'space-between'},
  keyIconSummary: {flex: 1, justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between'},
  turnoverSummary: {flexGrow: 1, alignItems: 'flex-end'}
})
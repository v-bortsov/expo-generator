import { MaterialIcons } from '@expo/vector-icons';
import { Icon, IconButton } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { languages } from '../../constants/Translations';
import { Text, View } from '../Themed';
import ActionSheet, { Items } from './ActionSheet';

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
        <ActionSheet {...{navigation}} buttonProps={{children: null}} iconProps={{as: <MaterialIcons name='more-vert' />, size: 'sm', color: 'white'}}>
          <Items languages={languages} navigation={navigation}/>
        </ActionSheet>
      </View>
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
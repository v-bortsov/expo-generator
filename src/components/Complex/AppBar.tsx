import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { languages } from '../../constants/Translations';
import { Text, View } from '../Themed';
import ActionSheet, { Items } from './ActionSheet';
import IconButton from '../../components/Complex/IconButton'

export default function AppBar({setAdd, fieldsDispatch, navigation}: any): JSX.Element{
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <IconButton style={{color: 'black', fontSize: 20, fontWeight: 'bold'}} startIcon={<MaterialIcons color={'black'} name='arrow-back' />} onPress={() => navigation.openDrawer()} children={`Here will a uniq title`} />
      </View>
      <View style={styles.item}>
        {`hi`}
        {/* <ActionSheet {...{navigation}} buttonProps={{children: null}} iconProps={{as: <MaterialIcons name='more-vert' />, size: 'sm', color: 'white'}}>
          <Items languages={languages} navigation={navigation}/>
        </ActionSheet> */}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {flex: 1, color: '#fff', flexDirection: 'row'},
  item: {flex: 1, },
})
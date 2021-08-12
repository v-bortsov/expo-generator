import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { isEmpty } from 'ramda';
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ActionSheet, Stagger } from '.';
import { loading, thunkCartesianCalc, run } from '../../features/generator/generatorSlice';
import i18n from '../../localization';
import { AppDispatch } from '../../store';
import { calcCount, downloadObjectAsJson } from '../../utils';
import { memorySizeOf, Formatter } from '../Formatter';
import IconButton from '../Complex/IconButton'
const startGen = (dispatch: AppDispatch) => () => {
  dispatch(loading(true))
  dispatch(thunkCartesianCalc())
    .then((row: any)=>{
      dispatch(run(row.payload))
    });
}

const AccordionFooter = ({dispatch, locale, rows, columns, getLoading, limiting}: any) => (
  <View style={[styles.row]}>
    <ActionSheet
      onPress={startGen(dispatch)}
      buttonProps={{
        children: i18n.t('run_button', { locale }),
        style: {backgroundColor: '#000', color: '#fff'},
        opacity: columns.length<=1 ? 0.3 : 1,
        hoverBg: '#06b6d4',
        isDisabled: columns.length<=1||getLoading,
        startIcon: <MaterialIcons style={{textAlignVertical: 'center'}} name='directions-run' color={'#fff'} size={32} />
      }}
    >
      <Text>Size: {memorySizeOf(rows)}, Total: {rows.length}</Text>
      <FontAwesome.Button
        name="cloud-download" 
        backgroundColor={isEmpty(rows) ? 'grey' : '#3b5998'}
        disabled={isEmpty(rows)}
        onPress={()=> downloadObjectAsJson(
          rows,
          'testify'
        )}>
        <Text>{i18n.t(
          'download_button',
          { locale }
        )}</Text>
      </FontAwesome.Button>
      <Formatter rows={rows} />
    </ActionSheet>
  </View>
)

export default AccordionFooter
const childMargin = {marginTop: 0, marginRight: 0, marginBottom: 5, marginLeft: 5}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    ...childMargin
    // alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-around'
    // paddingTop: StatusBar.currentHeight,
  },
})

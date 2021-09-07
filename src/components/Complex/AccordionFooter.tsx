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
import { theme } from '../../constants/Colors'

const startGen = (dispatch: AppDispatch) => () => dispatch(thunkCartesianCalc())

const AccordionFooter = ({dispatch, locale, rows, columns, getLoading, limiting}: any) => (
  <View style={[styles.row]}>
    <ActionSheet
      onPress={startGen(dispatch)}
      buttonProps={{
        children: i18n.t('run_button', { locale }),
        style: {backgroundColor: theme.colors.dart, color: theme.colors.light},
        opacity: columns.length<=1 ? 0.3 : 1,
        hoverBg: '#06b6d4',
        isDisabled: columns.length<=1||getLoading,
        startIcon: getLoading ? <ActivityIndicator size="large" color="#06b6d4" /> : <MaterialIcons style={{textAlignVertical: 'center'}} name='directions-run' color={theme.colors.light} size={32} />
      }}
    >
      <View><Text>hello!</Text></View>
      {/* {!getLoading  ? <>
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
      </>
      : null} */}
    </ActionSheet>
  </View>
)

export default AccordionFooter
const childMargin = {marginTop: 0, marginRight: 0, marginBottom: 5, marginLeft: 5}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    ...childMargin
  },
})

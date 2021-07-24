import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Accordion, Avatar, Box, IconButton } from 'native-base';
import { always, clone, cond, converge, indexBy, keys, map, objOf, path, pathEq, pick, pipe, prop, T, tap, values } from 'ramda';
import React from 'react';
import {View} from 'react-native'
import { Field } from '../../../react-app-env';
import { staggerButtons } from '../../constants/Fields';
import Fields from './AddColumn';

export function Summary({circle, name, label}: any): JSX.Element{ 
  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between'}}>
        <IconButton
          mb={4}
          backgroundColor={circle.backgroundColor}
          variant="solid"
          rounded="full"
          icon={<MaterialCommunityIcons size={36} name={circle.icon} />}
          // onPress={()=>actionByAdd(dispatch)(i.action)}
        />
      </View>
      <View
        style={{flex: 1, flexGrow: 4, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex=start', alignContent: 'space-between'}}>
        <View>{label}</View>
        <View>{label}</View>
      </View>
      <View style={{flexGrow: 1, alignItems: 'flex-end'}}><MaterialCommunityIcons size={48} name='chevron-down' /></View>
    </View>
  )
}
const getIconByType = (item: Field)=> pipe(
  indexBy(prop('type')),
  prop(path(
    ['type', 'value'],
    item
  ))
)(staggerButtons)
const pickFieldsByType = pipe(
  converge(
    pick,
    [
      cond([
        [
          pathEq(
            ['type', 'value'],
            'custom'
          ), always(['collect'])
        ], [
          pathEq(
            ['type', 'value'],
            'dates'
          ),always(['days', 'startDay', 'limit'])
        ], [
          pathEq(
            ['type', 'value'],
            'integer'
          ),always(['from-to', 'length'])
        ], [T, keys]
      ]), clone
    ]
  ),
  values,
  objOf('fields'),
)
export default function AccordionComponent({items, dispatch}: any) {
  return (
    <Box m={3}>
      <Accordion allowMultiple>     
        {map(
          (item: Field)=><Accordion.Item>
            <Accordion.Summary backgroundColor="orange.300" >
              <Summary
                circle={getIconByType(item)}
                label={path(
                  ['label', 'value'],
                  item
                )}
              />
            </Accordion.Summary>
            <Accordion.Details>
              <Fields
                {...{state: pickFieldsByType(item), dispatch}}/>
            </Accordion.Details>
          </Accordion.Item>,
          items
        )}
      </Accordion>
    </Box>
  );
}
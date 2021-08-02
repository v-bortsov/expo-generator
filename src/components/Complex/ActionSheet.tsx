import React from 'react';
import { Button, Actionsheet, useDisclose, Icon, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const languages = [
  {
    name: 'Русский', arrb: 'ru'
  }, {
    name: 'English', abbr: 'en'
  }, {
    name: 'Deutsche', abbr: 'de'
  }, {name: 'Français', abbr: 'fr'}
]
export default function ActionSheet () {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <IconButton icon={<Icon onPress={onOpen} as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {languages.map(item=><Actionsheet.Item>{item.name}</Actionsheet.Item>)}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
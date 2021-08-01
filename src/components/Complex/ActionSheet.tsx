import React from 'react';
import { Button, Actionsheet, useDisclose, Icon, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
export default function ActionSheet () {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <IconButton icon={<Icon onPress={onOpen} as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
      {/* <Button onPress={onOpen}>Actionsheet</Button> */}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {/* <Actionsheet.Header>Header</Actionsheet.Header> */}
          <Actionsheet.Item>Русский</Actionsheet.Item>
          <Actionsheet.Item>English</Actionsheet.Item>
          <Actionsheet.Item>Deutsche</Actionsheet.Item>
          <Actionsheet.Item>Français</Actionsheet.Item>
          <Actionsheet.Item color="red.500">Delete</Actionsheet.Item>
        </Actionsheet.Content>
        {/* <Actionsheet.Footer>
          <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Footer> */}
      </Actionsheet>
    </>
  );
}
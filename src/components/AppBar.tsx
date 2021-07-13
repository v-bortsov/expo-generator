import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { unionFields } from '../constants/Fields';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const MyComponent = ({setAdd, fieldsDispatch}: any) => (
  <Appbar.Header>
    <Appbar.Content title="Title" subtitle={'Subtitle'} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
    <Appbar.Action
      icon="plus-circle"
      size={32}
      color="white"
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
    />
    {/* <Appbar.Action icon="plus-circle" size={32} color="white" onPress={() => {}} /> */}
    <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
  </Appbar.Header>
);

export default MyComponent;
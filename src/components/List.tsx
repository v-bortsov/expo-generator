import { List } from '@ant-design/react-native';
import { Brief } from '@ant-design/react-native/lib/list/ListItem';
import { Ionicons } from '@expo/vector-icons';
import { applySpec, map, mergeRight, pipe, prepend, tap } from 'ramda';
import React from 'react';

export const CollectListItem: React.FC<any> = ({label, type, length, name, item, editColumn, removeColumn}: any)=>(
  <List.Item
    key={name}
    extra={
      <>
        <Brief style={{ textAlign: 'right' }}>{type} ({length})</Brief>
        <Ionicons name="remove-circle" onPress={()=>removeColumn(item)} color="red" size={16} />
        <Ionicons onPress={()=>editColumn({name, edit: true})} name="pencil" color="grey" size={16} />
      </>
    }>
    {label}
  </List.Item>
)

export const CollectList: React.FC<any> = ({collect, CreationItem, removeColumn, editColumn, transformItem}: any)=>(
  <List>
    {pipe(
      map(pipe(
        applySpec(transformItem),
        mergeRight({removeColumn, editColumn}),
        CollectListItem,
        // (column: any)=> <CollectListItem {...column} />
      )),
      prepend(CreationItem),
    )(collect)}
  </List>
)
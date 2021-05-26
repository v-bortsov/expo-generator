import { AimOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { TextAreaRef } from 'antd/lib/input/TextArea';
import {
  map, omit, pipe, props, zipObj,
} from 'ramda';
import React from 'react';
import { AppDispatch, ColumnType } from '../../react-app-env';
import { renameKeys } from 'ramda-combo';
import {
  changeColumn,
  removeColumn,
  run,
} from './generatorSlice';

const { TextArea } = Input;
const filterDropdown = (
  passObj: ColumnType<any>, obj: ColumnType<any>, ref: React.Ref<TextAreaRef>, dispatch: AppDispatch,
): JSX.Element => (
  <div style={ { padding: 8 } }>
    <TextArea
      onChange={ (e) => dispatch(changeColumn({
        ...passObj,
        collect: e.target.value.split('\n',),
      })) }
      placeholder={ 'Pass Keywords ' }
      ref={ ref }
      rows={ 4 }
      style={ { width: 188, marginBottom: 8, display: 'block' } }
      value={ obj.collect.join('\n',) }
    />
    <Button
      danger
      icon={ <DeleteOutlined /> }
      onClick={ () => dispatch(removeColumn({ ...passObj },),) }
      size="small"
      style={ { width: 90 } }
    >
        Remove
    </Button>

    <Button
      icon={ <SaveOutlined /> }
      onClick={ () => {
        dispatch(run(),);
      } }
      size="small"
      style={ { width: 90 } }
      type="primary"
    >
        GO
    </Button>
  </div>
);
const columnsFrontier = (
  omitColumns: any, passObj: ColumnType<any>, obj: ColumnType<any>, ref: React.Ref<TextAreaRef>, dispatch: AppDispatch,
) => ({
  ...omitColumns,
  filterDropdown: () => filterDropdown(
    passObj,
    obj,
    ref,
    dispatch,
  ),
  filterIcon: (filtered: boolean,) => <AimOutlined style={ { color: filtered ? '#1890ff' : undefined } } />,
  onFilterDropdownVisibleChange: (visible: boolean,) => {
    if (visible) {
      setTimeout(
        () => ref?.current?.focus(),
        100,
      );
    }
  },
  render: (text: string,) => text,
});

export const transformColumns = (
  ref: React.Ref<TextAreaRef>, dispatch: AppDispatch,
): any => map(pipe<any, any, any, any>(
  props(['label', 'name', 'label', 'collect']),
  zipObj(['title', 'dataIndex', 'key', 'collect']),
  (obj: ColumnType<any>) => {
    const omitColumns = omit(
      ['collect'],
      obj,
    );
    const passObj = {
      ...renameKeys(
        { title: 'label', dataIndex: 'name' },
        omitColumns,
      ),
    };
    return columnsFrontier(
      omitColumns,
      passObj,
      obj,
      ref,
      dispatch,
    );
  },
));

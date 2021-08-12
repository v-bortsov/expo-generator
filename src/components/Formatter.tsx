import { always, clone, cond, equals, join, map, mapObjIndexed, pipe, T, tap, values } from 'ramda'
import React from 'react'
import { ScrollView, VirtualizedList } from 'react-native'
import { useSelector } from 'react-redux';
import {  Text} from '../components/Themed'
import { RootState } from '../store';

export function memorySizeOf(obj: any) {
  let bytes = 0;

  function sizeOf(obj: any) {
    if(obj !== null && obj !== undefined) {
      switch(typeof obj) {
      case 'number':
        bytes += 8;
        break;
      case 'string':
        bytes += obj.length * 2;
        break;
      case 'boolean':
        bytes += 4;
        break;
      case 'object':
        var objClass = Object.prototype.toString.call(obj)
          .slice(
            8,
            -1
          );
        if(objClass === 'Object' || objClass === 'Array') {
          for(let key in obj) {
            if(!obj.hasOwnProperty(key)) continue;
            sizeOf(obj[key]);
          }
        } else bytes += obj.toString().length * 2;
        break;
      }
    }
    return bytes;
  }

  function formatByteSize(bytes: any) {
    if(bytes < 1024) return bytes + ' bytes';
    else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + ' KiB';
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + ' MiB';
    else return(bytes / 1073741824).toFixed(3) + ' GiB';
  }

  return formatByteSize(sizeOf(obj));
}
const FormRow = (row: any): JSX.Element =>  pipe<any, any, any, any>(
  mapObjIndexed((
    val, key, obj
  ): any => <Text><Text style={{color: '#f8c555'}}>{`\t\t"${key}"`}</Text><Text style={{color: '#67cdcc'}}>: </Text><Text style={{color: '#7ec699'}}>{`"${val}"`}</Text>,</Text>),
  values,
  (rowItem: any)=> [<Text style={{color: '#cccccc'}}>{'\t{\n'}</Text>, rowItem, <Text style={{color: '#cccccc'}}>{'\t},'}</Text>]
)(row)

const DATA: any[] = [];

const formatSwitcher = cond([[equals('json'), always(FormRow)], [equals('cvs'), always(FormRow)], [T, always(FormRow)]])

export const Formatter = ({rows}: any) => {
  const {format} = useSelector((state: RootState) => state.generator)
  
  return (
    // <ScrollView >
      <VirtualizedList
        style={{backgroundColor: '#282c34'}}
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }: any) => pipe<any, any>(
          formatSwitcher,
          (Format)=><Format {...item} />
        )(format)}
        keyExtractor={(item: any) => item.key}
        getItemCount={()=>rows.length}
        getItem={(
          listArr, index
        ): any => {
          const item = rows[index]
          return {
            ...item,
            key: index,
          };
        }}
      />
    // </ScrollView>
  )
}
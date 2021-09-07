import { is, isEmpty, isNil } from 'ramda';
import * as React from 'react';
import {Button} from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates';

function formatDate(date: string) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [day, month, year].join('-');
}

export function DatePicker(props: any) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(
    () => {
      setOpen(false);
    },
    [setOpen]
  );

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );
  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        title={isNil(props.value) || isEmpty(props.value) ? 'Pick single date' : is(
          String,
          props.value
        ) ? props.value : formatDate(props.value.toString())}
      />
      <DatePickerModal
        // locale={'en'} optional, default: automatic
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        // date={new Date(props.value.split('.')
        //   .reverse()
        //   .join('-'))}
        date={props.value}
        onConfirm={onConfirmSingle}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        // }}
        onChange={props.onChange} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      />
    </>
  );
}
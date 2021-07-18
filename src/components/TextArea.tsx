import { Stack, TextArea as Text } from 'native-base';
import { omit } from 'ramda';
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export const TextArea = (props: any): JSX.Element =>
//  <TextInput
//   onChangeText={props.onChange}
//   {...omit(
//     ['onChange'],
//     props
//   )}
//   style={styles.input}
//   multiline
//   numberOfLines={4} />
  <Stack space={4}>
    <Text
      onChangeText={props.onChange}
      {...omit(
        ['onChange'],
        props
      )}
      h={20}
      placeholder="Text Area Placeholder"
      variant="filled"
      _light={{
        placeholderTextColor: 'blueGray.400',
      }}
      _dark={{
        placeholderTextColor: 'blueGray.50',
      }} />
  </Stack>
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

export const TextArea = (props: any): JSX.Element => <TextInput
  onChangeText={props.onChange}
  {...omit(
    ['onChange'],
    props
  )}
  style={styles.input}
  multiline
  numberOfLines={4} />
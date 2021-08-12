import { MaterialIcons } from '@expo/vector-icons';
import { useLinkProps, Link, StackActions, CommonActions } from '@react-navigation/native';
import { Actionsheet, Icon, Button, useDisclose } from 'native-base';
import { head, last, map, pipe, toPairs } from 'ramda';
import {Text, View} from '../Themed'
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import IconButton from '../Complex/IconButton'

type Language = {
  [key: string]: string
}
const LinkButton = ({ to, action, children, ...rest }: any) => {

  const { onPress, ...props } = useLinkProps({ to, action });

  const [isHovered, setIsHovered] = React.useState(false);

  if (Platform.OS === 'web') {
    // It's important to use a `View` or `Text` on web instead of `TouchableX`
    // Otherwise React Native for Web omits the `onClick` prop that's passed
    // You'll also need to pass `onPress` as `onClick` to the `View`
    // You can add hover effects using `onMouseEnter` and `onMouseLeave`
    return (
      <View
        onClick={onPress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transitionDuration: '150ms', opacity: isHovered ? 0.5 : 1 }}
        {...props}
        {...rest}
      >
        <Text>{children}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
export const Items = ({languages, navigation}: {languages: Language, navigation: any}) => pipe<any, any, any>(
  toPairs,
  // map((item: string[])=><Link to={`/${head(item)}`}>{last(item)}</Link>)
  // map((item: string[])=><LinkButton
  //   action={StackActions.replace(
  //     'Home',
  //     { lang: head(item) }
  //   )}
  //   to={`/${head(item)}`}>{last(item)}</LinkButton>)
  // map((item: string)=><Actionsheet.Item
  //   onPress={() => navigation.navigate(
  //     'Home',
  //     {lang: head(item)}
  //   )}>{last(item)}</Actionsheet.Item>)
  map((item: string)=><Actionsheet.Item
    onPress={() => navigation.dispatch(CommonActions.navigate({
      name: 'Home',
      params: {
        lang: head(item),
      },
    }))}>{last(item)}</Actionsheet.Item>)
)(languages)

export default function ActionSheet ({ children, onPress, iconProps, buttonProps}: any) {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <IconButton onPress={pipe(onOpen, onPress)} {...buttonProps} >
        {buttonProps.children}
      </IconButton>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {children}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
import { CommonActions, useLinkProps } from '@react-navigation/native';
import { Actionsheet as ASheet, useDisclose } from 'native-base';
import { andThen, head, last, map, pipe, tap, toPairs } from 'ramda';
import React, { useRef, useState } from 'react';
import { Platform, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import IconButton from '../Complex/IconButton';
import { Text, View } from '../Themed';
import ActionSheet from '../Complex/ActionSheet/index'
import CustomActionSheet from '../Complex/ActionSheet/CustomActionSheet'
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
  map((item: string)=><ASheet.Item
    onPress={() => navigation.dispatch(CommonActions.navigate({
      name: 'Home',
      params: {
        lang: head(item),
      },
    }))}>{last(item)}</ASheet.Item>)
)(languages)

// export default function ActionSheet ({ children, onPress, iconProps, buttonProps}: any) {
//   const { isOpen, onOpen, onClose } = useDisclose();
//   return (
//     <>
//       <IconButton onPress={pipe(tap(onPress),tap(x => console.log('whatTheFuck', x)), onOpen)} {...buttonProps} >
//         {buttonProps.children}
//       </IconButton>
//       <Actionsheet isOpen={isOpen} onClose={onClose}>
//         <Actionsheet.Content>
//           {children}
//         </Actionsheet.Content>
//       </Actionsheet>
//     </>
//   );
// }
export default ({ children, onPress, iconProps, buttonProps}: any) => {
  const [open, setOpen] = useState(false)
  return (
    <View>
      {/* <SafeAreaView style={styles.safeareview}> */}
        <IconButton onPress={pipe(tap(onPress), ()=>setOpen(true))} {...buttonProps}>
          {buttonProps.children}
        </IconButton>

        <CustomActionSheet
          visible={open}
        >
          <>
            <IconButton onPress={()=>setOpen(false)} {...buttonProps}>
              Close
            </IconButton>
            {children}
          </>
        </CustomActionSheet>
        {/* <ActionSheet
          initialOffsetFromBottom={0.7}
          ref={actionSheetRef}
          statusBarTranslucent
          // onPositionChanged={onHasReachedTop}
          bounceOnOpen={true}
          drawUnderStatusBar={false}
          bounciness={4}
          gestureEnabled={true}
          defaultOverlayOpacity={0.3}>
            {children}
        </ActionSheet> */}
      {/* </SafeAreaView> */}
    </View>
  )
}
const styles = StyleSheet.create({
  safeareview: {
    justifyContent: 'center',
    flex: 1,
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fe8a71',
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0.3 * 4, height: 0.5 * 4},
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * 4,
  },
  btnTitle: {
    color: 'white',
    fontWeight: 'bold',
  }
})
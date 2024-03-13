import * as React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  CommonActions,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native';
import {Typography} from '@ui-library/atoms';
import {useThemeProvider} from '@ui-library/context/ThemeProvider';
import {Icon} from '@ui-library/atoms/Icon';
import {IconType} from '@ui-library/atoms/Icon.shared';
import {NavigationIcon} from './NavigationIcon';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {DEVICE_SIZES, maxSize, minSize} from 'rn-responsive-styles';

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
};

// Supported screen options
type TabNavigationOptions = {
  title?: string;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: {isAlreadyFocused: boolean};
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig;

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}: Props) {
  const {state, navigation, descriptors, NavigationContent} =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabNavigationOptions,
      TabNavigationEventMap
    >(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });
  const {theme} = useThemeProvider();

  const styles = themedStyles();

  return (
    <NavigationContent>
      <View style={styles.navigationWrapper}>
        <View style={[styles.navigationBar, tabBarStyle]}>
          {state.routes.map((route, index) => (
            <NavigationIcon
              routeName={route.name}
              title={descriptors[route.key].options.title ?? route.name}
              isFocused={state.index === index}
              key={route.key}
              onPress={() => {
                const isFocused = state.index === index;
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                  data: {
                    isAlreadyFocused: isFocused,
                  },
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.dispatch({
                    ...CommonActions.navigate(route),
                    target: state.key,
                  });
                }
              }}
            />
          ))}
        </View>
        <View style={[{flex: 1}, contentStyle]}>
          {state.routes.map((route, i) => {
            return (
              <View
                key={route.key}
                style={[
                  StyleSheet.absoluteFill,
                  {display: i === state.index ? 'flex' : 'none'},
                ]}>
                {descriptors[route.key].render()}
              </View>
            );
          })}
        </View>
      </View>
    </NavigationContent>
  );
}

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    navigationWrapper: {
      flexGrow: 1,
    },
    navigationBar: {
      backgroundColor: theme.palette.gray.medium,
    },
  },
  overrideStyles: {
    [minSize(DEVICE_SIZES.LG)]: {
      navigationWrapper: {
        flexDirection: 'row',
        flexGrow: 1,
      },
      navigationBar: {
        flexDirection: 'column',
        width: 80,
        marginLeft: 20,
        marginVertical: 40,
        borderRadius: theme.borders.radius,
        alignItems: 'center',
        paddingTop: 50,
        gap: 20,
        backgroundColor: theme.palette.gray.medium,
      },
    },
    [maxSize(DEVICE_SIZES.MD)]: {
      navigationWrapper: {
        flexDirection: 'column-reverse',
        flexGrow: 1,
      },
      navigationBar: {
        flexDirection: 'row',
        height: 80,
        marginHorizontal: 20,
        borderRadius: theme.borders.radius,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.palette.gray.medium,
      },
    },
  },
}));

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);

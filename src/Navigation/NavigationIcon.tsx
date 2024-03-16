import {Typography} from '@ui-library/atoms';
import {Icon} from '@ui-library/atoms/Icon';
import {IconType} from '@ui-library/atoms/Icon.shared';
import {useThemeProvider} from '@ui-library/context/ThemeProvider';
import {Pressable, View} from 'react-native';

type NavigationIconType = {
  routeName: string;
  title: string;
  isFocused?: boolean;
  onPress?: () => void;
};

export const NavigationIcon = ({
  routeName,
  title,
  isFocused,
  onPress,
}: NavigationIconType) => {
  const {theme} = useThemeProvider();
  const getIconName = (routeName: string): IconType => {
    if (routeName === 'Notes') {
      return 'scrollIcon';
    } else {
      return 'bookIcon';
    }
  };

  return (
    <Pressable
      style={{
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          borderRadius: 50,
          height: 50,
          width: 50,
          padding: 4,
          marginBottom: 2,
          alignItems: 'center',
          backgroundColor: isFocused
            ? theme.palette.primary.medium
            : theme.palette.gray.medium,
        }}>
        <Icon
          iconType={getIconName(routeName)}
          style={{
            height: 42,
            width: 42,
            color: theme.palette.white,
          }}
        />
      </View>
      {/* <Typography
        variant="paragraph"
        style={{
          color: theme.palette.white,
          fontSize: 12,
        }}>
        {title}
      </Typography> */}
    </Pressable>
  );
};

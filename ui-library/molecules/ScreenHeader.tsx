import {Button, Typography} from '@ui-library/atoms';
import {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';

type ActionButtonType = PropsWithChildren<{
  onPress: () => void;
}>;

type ScreenHeaderProps = {
  leftButton?: ActionButtonType;
  headerText?: string;
  rightButton?: ActionButtonType;
};

export const ScreenHeader = (props: ScreenHeaderProps) => {
  return (
    <>
      <View style={styles.menuContainer}>
        {props.leftButton && (
          <Button onPress={() => props.leftButton?.onPress()}>
            {props.leftButton.children}
          </Button>
        )}
        <View style={styles.menuTitle}>
          <Typography variant="heading3">{props.headerText}</Typography>
        </View>
        {props.rightButton && (
          <Button onPress={() => props.rightButton?.onPress()}>
            {props.rightButton.children}
          </Button>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginBottom: 32,
  },
  menuTitle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 100,
  },
});

import {View, Image, Platform} from 'react-native';
import {DEVICE_SIZES, minSize} from 'rn-responsive-styles';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {ImageBorder} from '@ui-library/molecules';

type PanelProps = {
  isContent?: boolean;
  children: React.ReactNode;
};

export const Panel = ({isContent, children}: PanelProps) => {
  const styles = themedStyles();
  return (
    <ImageBorder>
      <View style={[styles.panel, isContent ? styles.contentPanel : {}]}>
        {children}
      </View>
    </ImageBorder>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    panel: {
      backgroundColor: theme.palette.gray.medium,
      borderRadius: theme.borders.radius,
      width: '100%',
      paddingVertical: 20,
      marginVertical: theme.panel.marginVertical.default,
      flexGrow: 1,
    },
    contentPanel: {},
  },
  overrideStyles: {
    [minSize(DEVICE_SIZES.LG)]: {
      panel: {
        width: '32%',
      },
    },
    [DEVICE_SIZES.LG]: {
      panel: {
        width: '32%',
      },
      contentPanel: {
        width: '64%',
      },
    },
  },
}));

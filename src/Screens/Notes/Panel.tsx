import {View, Image, Platform, ViewProps} from 'react-native';
import {DEVICE_SIZES, minSize} from 'rn-responsive-styles';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {ImageBorder} from '@ui-library/molecules';

import border1 from '../../../assets/images/paper_border/border1.png';
import border2 from '../../../assets/images/paper_border/border2.png';
import border3 from '../../../assets/images/paper_border/border3.png';
import border4 from '../../../assets/images/paper_border/border4.png';
import border5 from '../../../assets/images/paper_border/border5.png';
import border6 from '../../../assets/images/paper_border/border6.png';
import border7 from '../../../assets/images/paper_border/border7.png';
import border8 from '../../../assets/images/paper_border/border8.png';
import border9 from '../../../assets/images/paper_border/border9.png';

type PanelProps = {
  isContent?: boolean;
  children: React.ReactNode;
};

export const Panel = ({isContent, children}: PanelProps) => {
  const styles = themedStyles();
  return (
    <ImageBorder
      borderImages={{
        topLeft: border1,
        top: border2,
        topRight: border3,
        right: border4,
        bottomRight: border5,
        bottom: border6,
        bottomLeft: border7,
        left: border8,
        center: border9,
      }}
      style={styles.panel}>
      <View
        style={[
          isContent
            ? styles.contentPanel
            : {
                width: '100%',
              },
        ]}>
        {children}
      </View>
    </ImageBorder>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    panel: {
      backgroundColor: theme.palette.gray.medium,
      width: '100%',
      marginVertical: theme.panel.marginVertical.default,
    },
    contentPanel: {width: '100%'},
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

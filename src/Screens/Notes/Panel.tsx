import {Icon} from '@ui-library/atoms/Icon';
import {EditableTextField} from '@ui-library/molecules/EditableTextField';
import firestore from 'firebase/firestore';
import {NoteModel} from 'firebase/firestoreTypes';
import {View} from 'react-native';
import {DEVICE_SIZES, minSize, useSizeRender} from 'rn-responsive-styles';
import {PanelFooterButton} from './PanelFooterButton';
import {CreateThemedStyle} from '@ui-library/context/theme';

type PanelProps = {
  isContent?: boolean;
  children: React.ReactNode;
};

export const Panel = ({isContent, children}: PanelProps) => {
  const styles = themedStyles();
  return (
    <View style={[styles.panel, isContent ? styles.contentPanel : {}]}>
      {children}
    </View>
  );
};

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    panel: {
      backgroundColor: theme.palette.gray.medium,
      borderRadius: theme.borders.radius,
      width: '100%',
      paddingVertical: 20,
      marginVertical: theme.panel.marginVertical,
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

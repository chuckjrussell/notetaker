import {Button} from '@ui-library/atoms';

type PanelFooterButtonType = {
  text: string;
  onPress: () => void;
};

export const PanelFooterButton = ({text, onPress}: PanelFooterButtonType) => (
  <Button
    onPress={onPress}
    style={{
      marginBottom: 20,
      alignSelf: 'center',
    }}
    variant="primary"
    text={text}
  />
);

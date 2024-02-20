import {StyleProp, TouchableOpacity, ViewProps, ViewStyle} from 'react-native';
import {Card, Typography} from '../atoms';

interface NoteCardProps {
  header: string;
  content: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const NoteCard = ({header, content, style, onPress}: NoteCardProps) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        onPress && onPress();
      }}>
      <Card>
        <Typography variant="heading3">{header}</Typography>
        <Typography variant="paragraph">{content}</Typography>
      </Card>
    </TouchableOpacity>
  );
};

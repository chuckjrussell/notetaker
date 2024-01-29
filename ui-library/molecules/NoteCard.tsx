import {StyleProp, ViewProps, ViewStyle} from 'react-native';
import {Card, Typography} from '../atoms';

interface NoteCardProps {
  header: string;
  content: string;
  footer: string;
  style?: StyleProp<ViewStyle>;
}

export const NoteCard = ({header, content, footer, style}: NoteCardProps) => {
  return (
    <Card style={style}>
      <Typography variant="heading3">{header}</Typography>
      <Typography variant="paragraph">{content}</Typography>
      <Typography variant="paragraph">{footer}</Typography>
    </Card>
  );
};

import {View} from 'react-native';
import {Button} from '..';
import {CreateThemedStyle} from '@ui-library/context/theme';

interface TagSelectorProps {
  tags?: string[];
  onTagsChanged?: (newTags?: string[]) => void;
  allSelector?: boolean;
}

export const TagSelector = ({
  tags,
  onTagsChanged,
  allSelector = false,
}: TagSelectorProps) => {
  const styles = useThemeStyles();
  return (
    <View style={{flexDirection: 'row'}}>
      {allSelector && (
        <Button variant="secondary" text="All" style={styles.tagButton} />
      )}
      {tags &&
        tags.map(tag => (
          <Button
            variant="secondary"
            style={styles.tagButton}
            text={tag}
            key={tag}></Button>
        ))}
    </View>
  );
};

const useThemeStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    tagButton: {
      marginRight: 20,
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
  },
}));

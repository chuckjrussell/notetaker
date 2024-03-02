import {TagSelector} from '@ui-library/molecules/TagSelector';
import {View} from 'react-native';
import {Button, TextInput} from '..';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {DEVICE_SIZES, useSizeRender} from 'rn-responsive-styles';
import {useUserProvider} from '../../src/firebase/UserProvider';

interface ScreenHeaderFiltersProps {
  tags?: string[];
  onTagsChanged?: (newTags?: string[]) => void;
  onTextSearchChanged?: (newSearch: string) => void;
  onSignout?: () => void;
  onMenuPressed?: () => void;
}

export const ScreenHeaderFilters = ({
  tags,
  onTagsChanged,
  onTextSearchChanged,
  onSignout,
  onMenuPressed,
}: ScreenHeaderFiltersProps) => {
  const styles = useThemeStyles();
  const {isLargerThan} = useSizeRender();
  const {userData} = useUserProvider();

  return (
    <View style={styles.container}>
      {isLargerThan(DEVICE_SIZES.MD) && (
        <TextInput
          style={styles.searchBar}
          onChangeText={onTextSearchChanged}
          placeholder="Search for notes"
        />
      )}
      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {isLargerThan(DEVICE_SIZES.MD) ? (
          <TagSelector tags={tags} onTagsChanged={onTagsChanged} allSelector />
        ) : (
          <Button
            text="Menu"
            onPress={() => {
              onMenuPressed && onMenuPressed();
            }}
          />
        )}

        <Button
          text={`Logout, ${userData?.firstName}`}
          onPress={() => {
            onSignout && onSignout();
          }}
        />
      </View>
    </View>
  );
};

const useThemeStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    container: {
      flexDirection: 'row',
      marginVertical: theme.panel.marginVertical,
      width: '100%',
    },
    searchBar: {
      marginRight: 20,
      width: '32%',
    },
  },
}));

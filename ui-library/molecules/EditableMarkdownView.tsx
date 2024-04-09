import {useNavigation} from '@react-navigation/native';
import {TextInput, Typography} from '@ui-library';
import {useThemeProvider} from '@ui-library/context/ThemeProvider';
import {CreateThemedStyle} from '@ui-library/context/theme';
import {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Markdown from 'react-native-markdown-display';

type LinkMap = {
  name: string;
  id: string;
};

export const EditableMarkdownView = ({
  contents,
  onContentsChanged,
  linkMap,
}: {
  contents?: string;
  onContentsChanged?: (newContents: string) => void;
  linkMap?: LinkMap[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(contents);
  const {setParams} = useNavigation();
  const {theme} = useThemeProvider();

  const styles = themedStyles();

  const enableEditing = () => {
    setIsEditing(true);
    setEditingContent(contents);
  };

  if (isEditing) {
    return (
      <TextInput
        multiline
        autofill
        onChangeText={newText => setEditingContent(newText)}
        value={editingContent}
        onBlur={() => {
          setIsEditing(false);
          onContentsChanged &&
            editingContent &&
            onContentsChanged(editingContent);
        }}
      />
    );
  }

  const mapLinks = (markdownContent?: string) => {
    if (!markdownContent || !linkMap) return markdownContent;
    return markdownContent.replace(/\@\[(.*?)\]/g, function (matched) {
      const docName = matched.substring(2, matched.length - 1);
      const note = linkMap.find(n => n.name === docName);
      return note ? `[${docName}](${note.id})` : `${docName} (create)`;
    });
  };

  return isNullOrWhitespace(contents) ? (
    <TouchableOpacity onPress={() => setIsEditing(true)}>
      <Typography variant="paragraph">Click here to add text...</Typography>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        enableEditing();
      }}>
      <Markdown
        style={{
          body: {
            color: theme.text.color,
            fontFamily: 'Rubik-Regular',
          },
          strong: styles.bold,
          blockquote: styles.quotes,
        }}
        rules={{
          heading1: (node, children) => (
            <Typography key={node.key} variant="heading1">
              {children}
            </Typography>
          ),
          heading2: (node, children) => (
            <Typography key={node.key} variant="heading2">
              {children}
            </Typography>
          ),
          heading3: (node, children) => (
            <Typography key={node.key} variant="heading3">
              {children}
            </Typography>
          ),
          link: (node, children, styles) => (
            <Text
              key={node.key}
              style={styles.link}
              onPress={() => {
                setParams({
                  noteId: node.attributes.href,
                });
              }}>
              {children}
            </Text>
          ),
        }}
        mergeStyle={true}>
        {mapLinks(contents)}
      </Markdown>
    </TouchableOpacity>
  );
};

function isNullOrWhitespace(input?: string) {
  return !input || !input.trim();
}

const themedStyles = CreateThemedStyle(theme => ({
  defaultStyle: {
    bold: {
      fontWeight: 'bold',
      fontFamily: 'Rubik-Bold',
    },
    quotes: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 10,
      borderWidth: 0,
      borderLeftWidth: 0,
    },
  },
}));

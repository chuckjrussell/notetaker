import {TextInput, Typography} from '@ui-library';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Markdown from 'react-native-markdown-display';

export const EditableMarkdownView = ({
  initialMarkdown,
}: {
  initialMarkdown: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return isEditing ? (
    <TextInput
      multiline
      numberOfLines={16}
      onChangeText={newText => setMarkdown(newText)}
      value={markdown}
      onBlur={() => setIsEditing(false)}
    />
  ) : (
    <TouchableOpacity onPress={() => setIsEditing(true)}>
      <Markdown
        style={{
          body: {
            color: '#ffffff',
            fontFamily: 'Rubik-Regular',
          },
          paragraph: {
            color: '#ffffff',
          },
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
        }}
        mergeStyle={true}>
        {markdown}
      </Markdown>
    </TouchableOpacity>
  );
};

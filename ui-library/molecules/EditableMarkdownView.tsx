import {TextInput, Typography} from '@ui-library';
import {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Markdown from 'react-native-markdown-display';

export const EditableMarkdownView = ({
  initialMarkdown,
  selectedNoteId,
}: {
  initialMarkdown: string;
  selectedNoteId?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [currentNoteId, setCurrentNoteId] = useState(selectedNoteId);

  useEffect(() => {
    if (selectedNoteId !== currentNoteId) {
      setMarkdown(initialMarkdown);
      setCurrentNoteId(selectedNoteId);
    }
  }, [selectedNoteId]);

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

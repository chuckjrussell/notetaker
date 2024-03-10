import {TextInput, Typography} from '@ui-library';
import {useEffect, useState} from 'react';
import {StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import Markdown from 'react-native-markdown-display';

export const EditableMarkdownView = ({
  contents,
  onContentsChanged,
}: {
  contents?: string;
  onContentsChanged?: (newContents: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(contents);

  if (isEditing) {
    return (
      <TextInput
        multiline
        numberOfLines={16}
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

  return isNullOrWhitespace(contents) ? (
    <TouchableOpacity onPress={() => setIsEditing(true)}>
      <Typography variant="paragraph">Click here to add text...</Typography>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        setIsEditing(true);
        setEditingContent(contents);
      }}>
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
        {contents}
      </Markdown>
    </TouchableOpacity>
  );
};

function isNullOrWhitespace(input?: string) {
  return !input || !input.trim();
}

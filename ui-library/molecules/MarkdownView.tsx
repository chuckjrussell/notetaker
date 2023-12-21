
import { Typography } from '@ui-library';
import type {PropsWithChildren} from 'react';
import Markdown from 'react-native-markdown-display';

export const MarkdownView = ({children}: PropsWithChildren) => {
    return (
        <Markdown rules={{
            heading1: (node, children) =>
                <Typography key={node.key} variant='heading1'>{children}</Typography>,
            heading2: (node, children) =>
                <Typography key={node.key} variant='heading2'>{children}</Typography>,
            heading3: (node, children) =>
                <Typography key={node.key} variant='heading3'>{children}</Typography>,
        }}>
            {children}
        </Markdown>
    )
}
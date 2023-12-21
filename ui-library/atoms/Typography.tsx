import { StyleSheet, Text } from "react-native"
import type {PropsWithChildren} from 'react';

function getStyle(variant: TypographyVariant){
    switch(variant){
        case 'heading1':
            return styles.heading1;
        case 'heading2':
            return styles.heading2;
        case 'heading3':
            return styles.heading3;
    }
}

type TypographyVariant = 'heading1' | 'heading2' | 'heading3'

type TypographyProps = PropsWithChildren<{
    variant: TypographyVariant
}>; 

export const Typography = (props: TypographyProps) => {
    return <Text style={getStyle(props.variant)}>{props.children}</Text>
}


const styles = StyleSheet.create({
  heading1: {
    marginTop: 32,
    fontSize: 32,
    fontWeight: '800',
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
  },
  heading3: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  }
});
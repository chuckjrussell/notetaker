import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {Typography} from '..';

type ImageBorderProps = {
  children?: React.ReactNode;
  borderSize?: number;
  borderImages: {
    topLeft?: ImageSourcePropType;
    top?: ImageSourcePropType;
    topRight?: ImageSourcePropType;
    right?: ImageSourcePropType;
    bottomRight?: ImageSourcePropType;
    bottom?: ImageSourcePropType;
    bottomLeft?: ImageSourcePropType;
    left?: ImageSourcePropType;
    center?: ImageSourcePropType;
  };
} & ViewProps;

export const ImageBorder = ({
  borderSize = 20,
  style,
  children,
  borderImages,
}: ImageBorderProps) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowMiddle: {
      flexGrow: 1,
    },

    rowEdge: {
      flexBasis: borderSize,
    },
    colEdge: {
      flexBasis: borderSize,
      flexGrow: 0,
    },

    colMiddle: {
      flexGrow: 1,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styles.rowEdge, {height: borderSize}]}>
        <ImageBackground
          source={borderImages.topLeft}
          style={[styles.colEdge]}
        />
        <ImageBackground
          source={borderImages.top}
          style={[styles.colMiddle]}
          resizeMode="stretch"
        />
        <ImageBackground
          source={borderImages.topRight}
          style={[styles.colEdge]}
        />
      </View>
      <View style={[styles.row, styles.rowMiddle]}>
        <ImageBackground
          source={borderImages.left}
          style={[styles.colEdge]}
          resizeMode="stretch"
        />
        <ImageBackground
          source={borderImages.center}
          resizeMode="stretch"
          style={[
            styles.colMiddle,
            {
              flexDirection: 'row',
              flex: 1,
            },
          ]}>
          {children}
        </ImageBackground>
        <ImageBackground
          source={borderImages.right}
          style={[styles.colEdge]}
          resizeMode="stretch"
        />
      </View>
      <View style={[styles.row, styles.rowEdge, {height: borderSize}]}>
        <ImageBackground
          source={borderImages.bottomLeft}
          style={[styles.colEdge]}
        />
        <ImageBackground
          source={borderImages.bottom}
          style={[styles.colMiddle]}
          resizeMode="stretch"
        />
        <ImageBackground
          source={borderImages.bottomRight}
          style={[styles.colEdge]}
        />
      </View>
    </View>
  );
};

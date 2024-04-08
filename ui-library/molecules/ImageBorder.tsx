import {ImageBackground, StyleSheet, View} from 'react-native';
import {Typography} from '..';

type ImageBorderProps = {
  children?: React.ReactNode;
};

export const ImageBorder = (props: ImageBorderProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.rowEdge]}>
        <View style={[styles.colEdge]}>
          <ImageBackground></ImageBackground>
          <Typography variant="paragraph">TL</Typography>
        </View>
        <View style={[styles.colMiddle]}>
          <Typography variant="paragraph">TM</Typography>
        </View>
        <View style={[styles.colEdge]}>
          <Typography variant="paragraph">TR</Typography>
        </View>
      </View>
      <View style={[styles.row, styles.rowMiddle]}>
        <View style={[styles.colEdge]}>
          <Typography variant="paragraph">ML</Typography>
        </View>
        <View
          style={[
            styles.colMiddle,
            {
              flexDirection: 'row',
            },
          ]}>
          {props.children}
        </View>
        <View style={[styles.colEdge]}>
          <Typography variant="paragraph">MR</Typography>
        </View>
      </View>
      <View style={[styles.row, styles.rowEdge]}>
        <View style={[styles.colEdge]}>
          <Typography variant="paragraph">BL</Typography>
        </View>
        <View style={[styles.colMiddle]}>
          <Typography variant="paragraph">BM</Typography>
        </View>
        <View style={[styles.colEdge]}>
          <Typography variant="paragraph">BR</Typography>
        </View>
      </View>
    </View>
  );
};

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
    flexBasis: 40,
  },
  colEdge: {
    flexBasis: 40,
    flexGrow: 0,
  },

  colMiddle: {
    flexGrow: 1,
  },
});

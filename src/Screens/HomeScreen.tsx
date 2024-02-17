import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation';
import {Button, ScreenWrapper, Typography} from '@ui-library/atoms';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {NoteCard} from '@ui-library/molecules';
import {View} from 'react-native';
import {
  CreateResponsiveStyle,
  DEVICE_SIZES,
  minSize,
} from 'rn-responsive-styles';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const styles = useStyles();
  return (
    <ScreenWrapper>
      <Button
        text="Logout"
        onPress={() => {
          signOut(auth);
        }}
      />
      <Typography variant="heading1">Welcome!</Typography>
      <View style={styles.noteContainer}>
        {notes.map(note => (
          <NoteCard
            onPress={() => {
              navigation.navigate('Note', {
                id: note.id,
              });
            }}
            style={styles.note}
            key={note.id}
            header={note.header}
            content={note.content}
            footer={note.footer}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

const useStyles = CreateResponsiveStyle(
  {
    noteContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 16,
    },
    note: {
      flexGrow: 1,
      width: '40%',
    },
  },
  {
    [minSize(DEVICE_SIZES.LG)]: {
      note: {
        flexGrow: 1,
        width: '20%',
      },
    },
  },
);

const notes: {
  id: number;
  header: string;
  content: string;
  footer: string;
}[] = [
  {
    id: 1,
    header: 'Tam Pax Degenero',
    content: 'Aro velit vos.',
    footer: '#ducimus #victus #error',
  },
  {
    id: 2,
    header: 'Dignissimos Dicta Subnecto',
    content: 'Totus convoco casso supellex soluta veniam.',
    footer: '#aufero #tunc #caries',
  },
  {
    id: 3,
    header: 'Arto Deporto Apto',
    content: 'Delectus tenuis cicuta alioqui appositus.',
    footer: '#unus #una #spiritus',
  },
  {
    id: 4,
    header: 'Dolorem Velit Suggero',
    content: 'Textus contabesco velum placeat.',
    footer: '#ager #velociter #suadeo',
  },
  {
    id: 5,
    header: 'Tametsi Alii Defleo',
    content: 'Suppellex quae cuius laborum aliqua animi.',
    footer: '#supplanto #summa #asporto',
  },
  {
    id: 6,
    header: 'Atrox Autem Turba',
    content: 'Absum vulticulus succurro accendo angelus.',
    footer: '#caute #considero #textilis',
  },
  {
    id: 7,
    header: 'Cervus Cuius Vigilo',
    content: 'Decumbo adfectus possimus auditor aperiam.',
    footer: '#audentia #dignissimos #laborum',
  },
  {
    id: 8,
    header: 'Caelestis Attollo Deserunt',
    content: 'Teneo curia suasoria umbra absque.',
    footer: '#hic #sumo #thermae',
  },
  {
    id: 9,
    header: 'Aro Cohibeo Cornu',
    content:
      'Vesper attonbitus ambulo ambulo itaque adflicto trucido thymbra maxime tonsor.',
    footer: '#cognatus #depulso #voluptatum',
  },
  {
    id: 10,
    header: 'Laborum Tutis Urbanus',
    content:
      'Thorax copia perspiciatis abduco sophismata canis ara summisse bestia consuasor.',
    footer: '#delibero #pecus #quo',
  },
];

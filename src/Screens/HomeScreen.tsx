import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation';
import {Button, ScreenWrapper, Typography} from '@ui-library/atoms';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {NoteCard} from '@ui-library/molecules';
import {FlatList, StyleSheet, View} from 'react-native';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen = (props: HomeScreenProps) => {
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
        {notes.map((note, idx) => (
          <NoteCard
            style={styles.note}
            key={idx}
            header={note.header}
            content={note.content}
            footer={note.footer}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 16,
  },
  note: {
    flexGrow: 1,
    width: '40%',
  },
});

const notes: {
  header: string;
  content: string;
  footer: string;
}[] = [
  {
    header: 'Tam Pax Degenero',
    content: 'Aro velit vos.',
    footer: '#ducimus #victus #error',
  },
  {
    header: 'Dignissimos Dicta Subnecto',
    content: 'Totus convoco casso supellex soluta veniam.',
    footer: '#aufero #tunc #caries',
  },
  {
    header: 'Arto Deporto Apto',
    content: 'Delectus tenuis cicuta alioqui appositus.',
    footer: '#unus #una #spiritus',
  },
  {
    header: 'Dolorem Velit Suggero',
    content: 'Textus contabesco velum placeat.',
    footer: '#ager #velociter #suadeo',
  },
  {
    header: 'Tametsi Alii Defleo',
    content: 'Suppellex quae cuius laborum aliqua animi.',
    footer: '#supplanto #summa #asporto',
  },
  {
    header: 'Atrox Autem Turba',
    content: 'Absum vulticulus succurro accendo angelus.',
    footer: '#caute #considero #textilis',
  },
  {
    header: 'Cervus Cuius Vigilo',
    content: 'Decumbo adfectus possimus auditor aperiam.',
    footer: '#audentia #dignissimos #laborum',
  },
  {
    header: 'Caelestis Attollo Deserunt',
    content: 'Teneo curia suasoria umbra absque.',
    footer: '#hic #sumo #thermae',
  },
  {
    header: 'Aro Cohibeo Cornu',
    content:
      'Vesper attonbitus ambulo ambulo itaque adflicto trucido thymbra maxime tonsor.',
    footer: '#cognatus #depulso #voluptatum',
  },
  {
    header: 'Laborum Tutis Urbanus',
    content:
      'Thorax copia perspiciatis abduco sophismata canis ara summisse bestia consuasor.',
    footer: '#delibero #pecus #quo',
  },
];

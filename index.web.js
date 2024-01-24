import {AppRegistry} from 'react-native';
import name from './app.json';
import App from './App';

import regular from './assets/fonts/Rubik-Regular.ttf';
import medium from './assets/fonts/Rubik-Medium.ttf';
import semiBold from './assets/fonts/Rubik-SemiBold.ttf';
import bold from './assets/fonts/Rubik-Bold.ttf';

const regularFontStyles = `@font-face {
  src: url(${regular});
  font-family: 'Rubik-Regular';
}`;

const mediumFontStyles = `@font-face {
  src: url(${medium});
  font-family: 'Rubik-Medium';
}`;
const semiFontStyles = `@font-face {
  src: url(${semiBold});
  font-family: 'Rubik-SemiBold';
}`;
const thinFontStyles = `@font-face {
  src: url(${bold});
  font-family: 'Rubik-Bold';
}`;
// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = regularFontStyles;
} else {
  style.appendChild(document.createTextNode(regularFontStyles));
  style.appendChild(document.createTextNode(mediumFontStyles));
  style.appendChild(document.createTextNode(semiFontStyles));
  style.appendChild(document.createTextNode(thinFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

AppRegistry.registerComponent(name, () => App);
AppRegistry.runApplication(name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});

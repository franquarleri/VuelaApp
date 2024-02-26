/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import Cotizaciones from './android/components/Cotizaciones';

AppRegistry.registerComponent(appName, () => Cotizaciones);

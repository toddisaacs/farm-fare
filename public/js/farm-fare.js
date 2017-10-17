import '../sass/style.scss';
import { $, $$ } from './modules/bling';
import makeMap from './modules/map';

const map = $('#map');

makeMap(document.getElementById('map'));

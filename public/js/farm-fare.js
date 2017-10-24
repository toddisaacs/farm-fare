import '../sass/style.scss';
import { $, $$ } from './modules/bling';
import { makeMap, getLocation } from './modules/map';

const map = $('#map');

makeMap(map);

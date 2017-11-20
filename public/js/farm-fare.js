import '../sass/style.scss';
import { $, $$ } from './modules/bling';
import { makeMap, getLocation } from './modules/map';
import autocomplete from './modules/autocomplete';

const map = $('#map');

autocomplete($('#address'), $('#lat'), $('#lng'));

makeMap(map);

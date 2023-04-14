// import './sass/styles.css';
import './sass/index.scss';
import markupFn from './templates/template.hbs';

const webpack = document.querySelector('.container');
webpack.insertAdjacentHTML('afterbegin', markupFn());

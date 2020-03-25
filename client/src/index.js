// react modules
import React from 'react';
import ReactDOM from 'react-dom';

// styles related modules and files
// import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';

// main component
import App from './components/App';

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);


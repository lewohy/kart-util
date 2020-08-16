import React from 'react';
import ReactDOM from 'react-dom';
import Setting from '../screens/Setting';
import { ipcRenderer } from 'electron';

(() => {
    ReactDOM.render(<Setting/>, document.getElementById('setting'));
})();

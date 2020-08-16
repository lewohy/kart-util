import React from 'react';
import ReactDOM from 'react-dom';
import KeyViewer from '../screens/KeyViewer';
import { ipcRenderer } from 'electron';

(() => {
    let stylesheet: HTMLLinkElement = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'file:///' + ipcRenderer.sendSync('get-cwd') + '/settings/key-viewer.css';

    document.head.appendChild(stylesheet);

    window.onmousemove = (event: MouseEvent) => {
        if (event.buttons === 1) {
            ipcRenderer.send('move-key-viewer', event.movementX, event.movementY);
        }
    };

    ReactDOM.render(<KeyViewer/>, document.getElementById('key-viewer'));
})();

import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import KeyTraceViewer from '../screens/KeyTraceViewer';

(() => {
    let stylesheet: HTMLLinkElement = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'file:///' + ipcRenderer.sendSync('get-cwd') + '/settings/key-trace-viewer.css';

    document.head.appendChild(stylesheet);

    window.onmousemove = (event: MouseEvent) => {
        if (event.buttons === 1) {
            ipcRenderer.send('move-key-trace-viewer', event.movementX, event.movementY);
        }
    };
    
    ReactDOM.render(<KeyTraceViewer/>, document.getElementById('key-trace-viewer'));
})();

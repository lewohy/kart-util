import React from 'react';
import ReactDOM from 'react-dom';
import TeamScoreViewer from '../screens/TeamScoreViewer';
import { ipcRenderer } from 'electron';

(() => {
    let stylesheet: HTMLLinkElement = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'file:///' + ipcRenderer.sendSync('get-cwd') + '/settings/team-score-viewer.css';

    document.head.appendChild(stylesheet);

    window.onmousemove = (event: MouseEvent) => {
        if (event.buttons === 1) {
            ipcRenderer.send('move-team-score-viewer', event.movementX, event.movementY);
        }
    };
    
    ReactDOM.render(<TeamScoreViewer/>, document.getElementById('team-score-viewer'));
})();

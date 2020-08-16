import path from 'path';
import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';

const CWD: string = process.env['INIT_CWD'] ? process.env['INIT_CWD'] : path.dirname(process.argv[0]);

abstract class Window {
    public onClose: () => void;
    protected _browserWindow: BrowserWindow;
    protected url: string;

    public get browserWindow(): BrowserWindow {
        return this._browserWindow;
    }

    public constructor(url: string) {
        this.url = url;

        this.init();
        this.afterInit();
    }

    protected abstract init(): void;

    private afterInit(): void {
        this.browserWindow.on('closed', () => {
            if (this.onClose) {
                this.onClose();
            }
        });
    }
}

class KeyViewerWindow extends Window {
    public constructor() {
        super('file://' + __dirname + '/pages/key-viewer.html');
    }
    
    protected init(): void {
        this._browserWindow = new BrowserWindow({
            width: 10,
            height: 10,
            webPreferences: {
                nodeIntegration: true
            },
            //frame: false,
            //resizable: false,
            //transparent: true,
            //backgroundColor: '#00FFFFFF',
            //alwaysOnTop: true
        });

        this.browserWindow.loadURL(this.url);
        //this.browserWindow.setMenu(null);
        this.browserWindow.webContents.openDevTools();
    }
}

class SettingWindow extends Window {
    public constructor() {
        super('file://' + __dirname + '/pages/setting.html');
    }
    
    protected init(): void {
        this._browserWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            webPreferences: {
                nodeIntegration: true
            },
            //frame: false,
            //resizable: false,
            //transparent: true,
            //backgroundColor: '#00FFFFFF',
            //alwaysOnTop: true
        });

        this.browserWindow.loadURL(this.url);
        this.browserWindow.webContents.openDevTools();
        //this.browserWindow.setMenu(null);
    }
}

class TeamScoreViewerWindow extends Window {
    public constructor() {
        super('file://' + __dirname + '/pages/team-score-viewer.html');
    }
    
    protected init(): void {
        this._browserWindow = new BrowserWindow({
            width: 0,
            height: 0,
            webPreferences: {
                nodeIntegration: true
            },
            frame: false,
            resizable: false,
            transparent: true,
            backgroundColor: '#00FFFFFF',
            alwaysOnTop: true
        });

        this.browserWindow.loadURL(this.url);
        //this.browserWindow.webContents.openDevTools();
        this.browserWindow.setMenu(null);
    }
}

class KeyTraceViewerWindow extends Window {
    public constructor() {
        super('file://' + __dirname + '/pages/key-trace-viewer.html');
    }
    
    protected init(): void {
        this._browserWindow = new BrowserWindow({
            width: 0,
            height: 0,
            webPreferences: {
                nodeIntegration: true
            },
            //frame: false,
            //resizable: false,
            //transparent: true,
            //backgroundColor: '#00FFFFFF',
            //alwaysOnTop: true
        });

        this.browserWindow.loadURL(this.url);
        this.browserWindow.webContents.openDevTools();
        //this.browserWindow.setMenu(null);
    }
}

(() => {
    let windows: {
        keyViewer: Window;
        setting: Window;
        teamScoreViewer: Window;
        keyTraceViewer: Window;
    } = {
        keyViewer: null,
        setting: null,
        teamScoreViewer: null,
        keyTraceViewer: null
    };

    ipcMain.on('get-cwd', event => {
        event.returnValue = CWD;
    }).on('refresh-config', event => {
        if (windows.keyViewer) {
            windows.keyViewer.browserWindow.webContents.send('refresh-config');
        }

        if (windows.setting) {
            windows.setting.browserWindow.webContents.send('refresh-config');
        }

        if (windows.teamScoreViewer) {
            windows.teamScoreViewer.browserWindow.webContents.send('refresh-config');
        }

        if (windows.keyTraceViewer) {
            windows.keyTraceViewer.browserWindow.webContents.send('refresh-config');
        }
    }).on('open-key-viewer', () => {
        if (!windows.keyViewer) {
            windows.keyViewer = new KeyViewerWindow();
            windows.keyViewer.onClose = () => {
                windows.keyViewer = null;
            };
        }
    }).on('move-key-viewer', (event, movementX: number, movementY: number) => {
        let position = windows.keyViewer.browserWindow.getPosition();
        windows.keyViewer.browserWindow.setPosition(position[0] + movementX, position[1] + movementY);
    }).on('resize-key-viewer', (event, width: number, height: number) => {
        windows.keyViewer.browserWindow.resizable = true;
        windows.keyViewer.browserWindow.setSize(width, height);
        //windows.keyViewer.browserWindow.resizable = false;
    }).on('open-setting', () => {
        if (!windows.setting) {
            windows.setting = new SettingWindow();
            windows.setting.onClose = () => {
                windows.setting = null;
            };
        }
    }).on('open-team-score-viewer', event => {
        if (!windows.teamScoreViewer) {
            windows.teamScoreViewer = new TeamScoreViewerWindow();
            windows.teamScoreViewer.onClose = () => {
                windows.teamScoreViewer = null;
            };
        }
    }).on('close-team-score-viewer', event => {
        if (windows.teamScoreViewer) {
            windows.teamScoreViewer.browserWindow.close();
        }
    }).on('move-team-score-viewer', (event, movementX: number, movementY: number) => {
        let position = windows.teamScoreViewer.browserWindow.getPosition();
        windows.teamScoreViewer.browserWindow.setPosition(position[0] + movementX, position[1] + movementY);
    }).on('resize-team-score-viewer', (event, width: number, height: number) => {
        if (windows.teamScoreViewer) {
            windows.teamScoreViewer.browserWindow.resizable = true;
            windows.teamScoreViewer.browserWindow.setSize(width, height);
            windows.teamScoreViewer.browserWindow.resizable = false;
        }
    }).on('open-key-trace-viewer', event => {
        if (!windows.keyTraceViewer) {
            windows.keyTraceViewer = new KeyTraceViewerWindow();
            windows.keyTraceViewer.onClose = () => {
                windows.keyTraceViewer = null;
            };
        }
    }).on('close-key-trace-viewer', event => {
        if (windows.keyTraceViewer) {
            windows.keyTraceViewer.browserWindow.close();
        }
    });

    app.on('ready', () => {
        windows.keyViewer = new KeyViewerWindow();
    }).on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
})();

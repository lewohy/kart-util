"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var electron_1 = require("electron");
var CWD = process.env['INIT_CWD'] ? process.env['INIT_CWD'] : path_1.default.dirname(process.argv[0]);
var Window = /** @class */ (function () {
    function Window(url) {
        this.url = url;
        this.init();
        this.afterInit();
    }
    Object.defineProperty(Window.prototype, "browserWindow", {
        get: function () {
            return this._browserWindow;
        },
        enumerable: false,
        configurable: true
    });
    Window.prototype.afterInit = function () {
        var _this = this;
        this.browserWindow.on('closed', function () {
            if (_this.onClose) {
                _this.onClose();
            }
        });
    };
    return Window;
}());
var KeyViewerWindow = /** @class */ (function (_super) {
    __extends(KeyViewerWindow, _super);
    function KeyViewerWindow() {
        return _super.call(this, 'file://' + __dirname + '/pages/key-viewer.html') || this;
    }
    KeyViewerWindow.prototype.init = function () {
        this._browserWindow = new electron_1.BrowserWindow({
            width: 10,
            height: 10,
            webPreferences: {
                nodeIntegration: true
            },
        });
        this.browserWindow.loadURL(this.url);
        //this.browserWindow.setMenu(null);
        this.browserWindow.webContents.openDevTools();
    };
    return KeyViewerWindow;
}(Window));
var SettingWindow = /** @class */ (function (_super) {
    __extends(SettingWindow, _super);
    function SettingWindow() {
        return _super.call(this, 'file://' + __dirname + '/pages/setting.html') || this;
    }
    SettingWindow.prototype.init = function () {
        this._browserWindow = new electron_1.BrowserWindow({
            width: 1280,
            height: 720,
            webPreferences: {
                nodeIntegration: true
            },
        });
        this.browserWindow.loadURL(this.url);
        this.browserWindow.webContents.openDevTools();
        //this.browserWindow.setMenu(null);
    };
    return SettingWindow;
}(Window));
var TeamScoreViewerWindow = /** @class */ (function (_super) {
    __extends(TeamScoreViewerWindow, _super);
    function TeamScoreViewerWindow() {
        return _super.call(this, 'file://' + __dirname + '/pages/team-score-viewer.html') || this;
    }
    TeamScoreViewerWindow.prototype.init = function () {
        this._browserWindow = new electron_1.BrowserWindow({
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
    };
    return TeamScoreViewerWindow;
}(Window));
var KeyTraceViewerWindow = /** @class */ (function (_super) {
    __extends(KeyTraceViewerWindow, _super);
    function KeyTraceViewerWindow() {
        return _super.call(this, 'file://' + __dirname + '/pages/key-trace-viewer.html') || this;
    }
    KeyTraceViewerWindow.prototype.init = function () {
        this._browserWindow = new electron_1.BrowserWindow({
            width: 0,
            height: 0,
            webPreferences: {
                nodeIntegration: true
            },
        });
        this.browserWindow.loadURL(this.url);
        this.browserWindow.webContents.openDevTools();
        //this.browserWindow.setMenu(null);
    };
    return KeyTraceViewerWindow;
}(Window));
(function () {
    var windows = {
        keyViewer: null,
        setting: null,
        teamScoreViewer: null,
        keyTraceViewer: null
    };
    electron_1.ipcMain.on('get-cwd', function (event) {
        event.returnValue = CWD;
    }).on('refresh-config', function (event) {
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
    }).on('open-key-viewer', function () {
        if (!windows.keyViewer) {
            windows.keyViewer = new KeyViewerWindow();
            windows.keyViewer.onClose = function () {
                windows.keyViewer = null;
            };
        }
    }).on('move-key-viewer', function (event, movementX, movementY) {
        var position = windows.keyViewer.browserWindow.getPosition();
        windows.keyViewer.browserWindow.setPosition(position[0] + movementX, position[1] + movementY);
    }).on('resize-key-viewer', function (event, width, height) {
        windows.keyViewer.browserWindow.resizable = true;
        windows.keyViewer.browserWindow.setSize(width, height);
        //windows.keyViewer.browserWindow.resizable = false;
    }).on('open-setting', function () {
        if (!windows.setting) {
            windows.setting = new SettingWindow();
            windows.setting.onClose = function () {
                windows.setting = null;
            };
        }
    }).on('open-team-score-viewer', function (event) {
        if (!windows.teamScoreViewer) {
            windows.teamScoreViewer = new TeamScoreViewerWindow();
            windows.teamScoreViewer.onClose = function () {
                windows.teamScoreViewer = null;
            };
        }
    }).on('close-team-score-viewer', function (event) {
        if (windows.teamScoreViewer) {
            windows.teamScoreViewer.browserWindow.close();
        }
    }).on('move-team-score-viewer', function (event, movementX, movementY) {
        var position = windows.teamScoreViewer.browserWindow.getPosition();
        windows.teamScoreViewer.browserWindow.setPosition(position[0] + movementX, position[1] + movementY);
    }).on('resize-team-score-viewer', function (event, width, height) {
        if (windows.teamScoreViewer) {
            windows.teamScoreViewer.browserWindow.resizable = true;
            windows.teamScoreViewer.browserWindow.setSize(width, height);
            windows.teamScoreViewer.browserWindow.resizable = false;
        }
    }).on('open-key-trace-viewer', function (event) {
        if (!windows.keyTraceViewer) {
            windows.keyTraceViewer = new KeyTraceViewerWindow();
            windows.keyTraceViewer.onClose = function () {
                windows.keyTraceViewer = null;
            };
        }
    }).on('close-key-trace-viewer', function (event) {
        if (windows.keyTraceViewer) {
            windows.keyTraceViewer.browserWindow.close();
        }
    });
    electron_1.app.on('ready', function () {
        windows.keyViewer = new KeyViewerWindow();
    }).on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
})();

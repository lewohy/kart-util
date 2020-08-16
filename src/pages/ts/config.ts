import fs from 'fs';
import { ipcRenderer } from 'electron';
import { ConfigJSON, KeyViewerJSON, KeyInfoJSON, TeamScoreViewerJSON, KeyTraceViewerJSON, TraceKeyInfoJSON } from '../../../@types/config';

export class Config {
    private static configRefreshCallbackList: Array<() => void>;
    public keyViewer: KeyViewer;
    public teamScoreViewer: TeamScoreViewer;
    public keyTraceViewer: KeyTraceViewer;

    public static initialize(): void {
        Config.configRefreshCallbackList = new Array<() => void>();
        
        ipcRenderer.on('refresh-config', e => {
            Config.configRefreshCallbackList.forEach(e => e());
        });
    }

    public static registerConfigRefresh(callback: () => void): void {
        Config.configRefreshCallbackList.push(callback);
    }

    public static getConfig(): Config {
        let path = ipcRenderer.sendSync('get-cwd') + '/settings/config.json';
        let json = JSON.parse(fs.readFileSync(path).toString()) as ConfigJSON;

        return new Config(json);
    }

    private constructor(json: ConfigJSON) {
        this.keyViewer = new KeyViewer(json['keyViewer']);
        this.teamScoreViewer = new TeamScoreViewer(json['teamScoreViewer']);
        this.keyTraceViewer = new KeyTraceViewer(json['keyTraceViewer']);
    }

    public save(): void {
        let path = ipcRenderer.sendSync('get-cwd') + '/settings/config.json';
        fs.writeFileSync(path, JSON.stringify(this, null, 4));
        
        ipcRenderer.send('refresh-config');
    }
}

export class KeyViewer {
    public width: number;
    public height: number;
    public keyList: Array<KeyInfo>;

    public constructor(json: KeyViewerJSON) {
        this.width = json['width'];
        this.height = json['height'];
        this.keyList = new Array<KeyInfo>();

        for (let item of json['keyList']) {
            this.keyList.push(new KeyInfo(item));
        }
    }
}

export class KeyInfo {
    public name: string;
    public code: number;
    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public visible: boolean;

    public constructor(json?: KeyInfoJSON) {
        if (json) {
            this.name = json['name'];
            this.code = json['code'];
            this.width = json['width'];
            this.height = json['height'];
            this.x = json['x'];
            this.y = json['y'];
            this.visible = json['visible'];
        } else {
            this.name = 'name';
            this.code = 0;
            this.width = 0;
            this.height = 0;
            this.x = 0;
            this.y = 0;
            this.visible = false;
        }
    }
}

export class TeamScoreViewer {
    public enabled: boolean;
    public width: number;
    public height: number;

    public constructor(json: TeamScoreViewerJSON) {
        this.enabled = json['enabled'];
        this.width = json['width'];
        this.height = json['height'];
    }
}

export class KeyTraceViewer {
    public enabled: boolean;
    public width: number;
    public height: number;
    public keyList: Array<TraceKeyInfo>;

    public constructor(json: KeyTraceViewerJSON) {
        this.enabled = json['enabled'];
        this.width = json['width'];
        this.height = json['height'];
        this.keyList = new Array<TraceKeyInfo>();

        for (let item of json['keyList']) {
            this.keyList.push(new TraceKeyInfo(item));
        }
    }
}

export class TraceKeyInfo {
    public name: string;
    public code: number;
    public x: number;
    public width: number;
    public height: number;

    public constructor(json: TraceKeyInfoJSON) {
        this.name = json['name'];
        this.code = json['code'];
        this.x = json['x'];
        this.width = json['width'];
        this.height = json['height'];
    }
}

Config.initialize();

import { KeyViewer } from "../src/pages/ts/config";

declare type ConfigJSON = {
    keyViewer: KeyViewerJSON;
    teamScoreViewer: TeamScoreViewerJSON;
    keyTraceViewer: KeyTraceViewerJSON;
};

declare type KeyViewerJSON = {
    width: number;
    height: number;
    keyList: Array<KeyInfoJSON>;
};

declare type KeyInfoJSON = {
    name: string;
    code: number;
    width: number;
    height: number;
    x: number;
    y: number;
    visible: boolean;
};

declare type TeamScoreViewerJSON = {
    enabled: boolean;
    width: number;
    height: number;
};


declare type KeyTraceViewerJSON = {
    enabled: boolean;
    width: number;
    height: number;
    speed: number;
    keyList: Array<TraceKeyInfoJSON>;
};

declare type TraceKeyInfoJSON = {
    name: string;
    code: number;
    x: number;
    width: number;
    height: number;
};

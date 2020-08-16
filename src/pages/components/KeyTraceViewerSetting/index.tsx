import React from 'react';
import SwitchProperty from '../SwitchProperty';
import { KeyTraceViewer } from '../../ts/config';
import { ipcRenderer } from 'electron';

type KeyTraceViewerSettingProp = {
    keyTraceViewer: KeyTraceViewer;
};

export default function KeyTraceViewerSetting(props: Readonly<KeyTraceViewerSettingProp>) {

    let toggleKeyTraceViewer = (open: boolean) => {
        if (open) {
            ipcRenderer.send('open-key-trace-viewer');
        } else {
            ipcRenderer.send('close-key-trace-viewer');
        }

        // TODO
    };

    return (
        <div>
            <div
                style={{
                    margin: "0px 8px"
                }}>
                    
                <SwitchProperty
                    name="키보드 흔적 보기"
                    defaultValue={ props.keyTraceViewer.enabled }
                    onValueChanged={ toggleKeyTraceViewer }/>

            </div>
        </div>
    );
}

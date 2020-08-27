import React from 'react';
import SwitchProperty from '../SwitchProperty';
import { KeyTraceViewer, TraceKeyInfo } from '../../ts/config';
import { ipcRenderer } from 'electron';
import TraceKeyListView from '../TraceKeyListView';
import TextProperty from '../TextProperty';

type KeyTraceViewerSettingProp = {
    keyTraceViewer: KeyTraceViewer;
    onKeyTraceViewerEnableChanged: (value: boolean) => void;
    onKeyInfoAdded: (keyInfo: TraceKeyInfo) => void;
    onKeyInfoChanged: (index: number, keyInfo: TraceKeyInfo) => void;
    onKeyInfoDeleteButtonClicked: (index: number) => void;
    onKeyTraceViewerWidthChanged: (width: number) => void;
    onKeyTraceViewerHeightChanged: (height: number) => void;
    onKeyTraceViewerSpeedChanged: (height: number) => void;
};

export default function KeyTraceViewerSetting(props: Readonly<KeyTraceViewerSettingProp>) {
    const [keyTraceViewer, setKeyTraceViewer] = React.useState(props.keyTraceViewer);

    let toggleKeyTraceViewer = (open: boolean) => {
        if (open) {
            ipcRenderer.send('open-key-trace-viewer');
        } else {
            ipcRenderer.send('close-key-trace-viewer');
        }

        props.onKeyTraceViewerEnableChanged(open);
    };
    
    let toNumberString = (str: string) => {
        let r = Number(str);
        
        return (r ? (r > 3000 ? 3000 : r) : '').toString();
    };

    React.useEffect(() => {
        setKeyTraceViewer(props.keyTraceViewer);
    }, [props.keyTraceViewer]);

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

            <TraceKeyListView
                keyList={ keyTraceViewer.keyList }
                onKeyInfoAdded={ props.onKeyInfoAdded }
                onKeyInfoChanged={ props.onKeyInfoChanged }
                onKeyInfoDeleteButtonClicked={ props.onKeyInfoDeleteButtonClicked } />
            
            <div
                style={{
                    margin: "0px 8px"
                }}>

                <TextProperty
                    name="Width"
                    defaultValue={ keyTraceViewer.width.toString() }
                    valueConverter={ toNumberString }
                    onValueChanged={ (value) => { props.onKeyTraceViewerWidthChanged(Number(value)); }}/>

                <TextProperty
                    name="Height"
                    defaultValue={ keyTraceViewer.height.toString() }
                    valueConverter={ toNumberString }
                    onValueChanged={ (value) => { props.onKeyTraceViewerHeightChanged(Number(value)); }}/>

                <TextProperty
                    name="Speed"
                    defaultValue={ keyTraceViewer.speed.toString() }
                    valueConverter={ toNumberString }
                    onValueChanged={ (value) => { props.onKeyTraceViewerSpeedChanged(Number(value)); }}/>

            </div>
        </div>
    );
}

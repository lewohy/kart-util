import React from 'react';
import './style.scss';
import { KeyViewer, KeyInfo } from '../../ts/config';
import KeyListView from '../KeyListView';
import HorizontalBox from '../HorizonalBox';
import { Typography, TextField } from '@material-ui/core';
import { Height } from '@material-ui/icons';
import TextProperty from '../TextProperty';

type KeyViewerSettingProp = {
    keyViewer: KeyViewer;
    onKeyInfoAdded: (keyInfo: KeyInfo) => void;
    onKeyInfoDeleteButtonClicked: (index: number) => void;
    onKeyInfoChanged: (index: number, keyInfo: KeyInfo) => void;
    onKeyViewerWidthChanged: (width: number) => void;
    onKeyViewerHeightChanged: (height: number) => void;
};

export default function KeyViewerSetting(props: Readonly<KeyViewerSettingProp>) {
    const [keyViewer, setKeyViewer] = React.useState(props.keyViewer);

    let onKeyInfoAdded = (keyInfo: KeyInfo) => {
        props.onKeyInfoAdded(keyInfo);
    };

    let onKeyInfoDeleteButtonClicked = (index: number) => {
        props.onKeyInfoDeleteButtonClicked(index);
    };

    let onKeyInfoChanged = (index: number, keyInfo: KeyInfo) => {
        props.onKeyInfoChanged(index, keyInfo);
    };

    let toNumberString = (str: string) => {
        let r = Number(str);
        
        return (r ? (r > 3000 ? 3000 : r) : '').toString();
    };

    React.useEffect(() => {
        setKeyViewer(props.keyViewer);
    }, [props.keyViewer]);

    return (
        <div
            className="key-viewer-setting">
            <KeyListView
                keyList={ keyViewer.keyList }
                onKeyInfoAdded={ onKeyInfoAdded }
                onKeyInfoDeleteButtonClicked={ onKeyInfoDeleteButtonClicked }
                onKeyInfoChanged={ onKeyInfoChanged }/>

            <div
                style={{
                    margin: "0px 8px"
                }}>

                <TextProperty
                    name="Key Viewer Width"
                    defaultValue={ keyViewer.width.toString() }
                    valueConverter={ toNumberString }
                    onValueChanged={ (value) => { props.onKeyViewerWidthChanged(Number(value)); }}/>

                <TextProperty
                    name="Key Viewer Height"
                    defaultValue={ keyViewer.height.toString() }
                    valueConverter={ toNumberString }
                    onValueChanged={ (value) => { props.onKeyViewerWidthChanged(Number(value)); }}/>
            </div>
        </div>
    );
}

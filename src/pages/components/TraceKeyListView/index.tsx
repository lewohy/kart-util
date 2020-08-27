import React from 'react';
import './style.scss';
import { TraceKeyInfo } from '../../ts/config';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import TraceKeyListViewItem from './TraceKeyListItem';
import TraceKeyInfoDialog from '../TraceKeyInfoDialog';

type TraceKeyListViewProp = {
    keyList: Array<TraceKeyInfo>;
    onKeyInfoAdded: (keyInfo: TraceKeyInfo) => void;
    onKeyInfoDeleteButtonClicked: (index: number) => void;
    onKeyInfoChanged: (index: number, keyInfo: TraceKeyInfo) => void;
};

export default function TraceKeyListView(props: Readonly<TraceKeyListViewProp>) {
    const [focusedKeyIndex, setFocusedKeyIndex] = React.useState(-1);
    const [newKeyInfo, setNewKeyInfo] = React.useState<TraceKeyInfo>(null);

    let onKeyInfoAdded = (keyInfo: TraceKeyInfo) => {
        props.onKeyInfoAdded(keyInfo);
        setNewKeyInfo(null);
    };

    let onKeyInfoChanged = (keyInfo: TraceKeyInfo) => {
        props.onKeyInfoChanged(focusedKeyIndex, keyInfo);
        setFocusedKeyIndex(-1);
    };

    let onKeyInfoDeleteButtonClicked = (index: number) => {
        props.onKeyInfoDeleteButtonClicked(index);
    };

    let onKeyInfoClicked = (index: number, keyInfo: TraceKeyInfo) => {
        setFocusedKeyIndex(index);
    };

    return (
        <div
            className="trace-key-list-view">

            <div
                className="trace-key-list-scroll-area">
                {
                    props.keyList?.map((e, i) => {
                        return (
                            <TraceKeyListViewItem
                                key={ i }
                                index={ i }
                                keyInfo={ e }
                                onKeyInfoDeleteButtonClicked={ onKeyInfoDeleteButtonClicked }
                                onKeyInfoClicked={ onKeyInfoClicked }/>
                        );
                    })
                }
            </div>

            <IconButton
                className="add-trace-key-info-button"
                size="small"
                style={{
                    marginTop: 8,
                    marginLeft: 8
                }}
                onClick={ () => { setNewKeyInfo(new TraceKeyInfo()); } }>
                <Add/>
            </IconButton>

            <TraceKeyInfoDialog
                keyInfo={ focusedKeyIndex === -1 ? null : props.keyList[focusedKeyIndex] }
                onCancelClicked={ () => { setFocusedKeyIndex(-1); } }
                onApplyClicked={ onKeyInfoChanged }/>

            <TraceKeyInfoDialog
                keyInfo={ newKeyInfo }
                onCancelClicked={ () => { setNewKeyInfo(null); } }
                onApplyClicked={ onKeyInfoAdded }/>
        </div>
    );
}

import React from 'react';
import './style.scss';
import KeyListViewItem from './KeyListViewItem';
import { KeyInfo } from '../../ts/config';
import KeyInfoDialog from '../KeyInfoDialog';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type KeyListViewProp = {
    keyList: Array<KeyInfo>;
    onKeyInfoAdded: (keyInfo: KeyInfo) => void;
    onKeyInfoDeleteButtonClicked: (index: number) => void;
    onKeyInfoChanged: (index: number, keyInfo: KeyInfo) => void;
};

export default function KeyListView(props: Readonly<KeyListViewProp>) {
    const [focusedKeyIndex, setFocusedKeyIndex] = React.useState(-1);
    const [newKeyInfo, setNewKeyInfo] = React.useState<KeyInfo>(null);

    let onKeyInfoAdded = (keyInfo: KeyInfo) => {
        props.onKeyInfoAdded(keyInfo);
        setNewKeyInfo(null);
    };

    let onKeyVisibleChanged = (index: number, keyInfo: KeyInfo) => {
        props.onKeyInfoChanged(index, keyInfo);
    };

    let onKeyInfoChanged = (keyInfo: KeyInfo) => {
        props.onKeyInfoChanged(focusedKeyIndex, keyInfo);
        setFocusedKeyIndex(-1);
    };

    let onKeyInfoDeleteButtonClicked = (index: number) => {
        props.onKeyInfoDeleteButtonClicked(index);
    };

    let onKeyInfoClicked = (index: number, keyInfo: KeyInfo) => {
        setFocusedKeyIndex(index);
    };

    return (
        <div
            className="key-list-view">
            <div
                className="key-list-scroll-area">
                {
                    props.keyList?.map((e, i) => {
                        return (
                            <KeyListViewItem
                                key={ i }
                                index={ i }
                                keyInfo={ e }
                                onKeyVisibleChanged={ onKeyVisibleChanged }
                                onKeyInfoDeleteButtonClicked={ onKeyInfoDeleteButtonClicked }
                                onKeyInfoClicked={ onKeyInfoClicked }/>
                        );
                    })
                }
            </div>

            <IconButton
                className="add-key-info-button"
                size="small"
                style={{
                    marginTop: 8,
                    marginLeft: 8
                }}
                onClick={ () => { setNewKeyInfo(new KeyInfo()); } }>
                <Add/>
            </IconButton>

            <KeyInfoDialog
                keyInfo={ focusedKeyIndex === -1 ? null : props.keyList[focusedKeyIndex] }
                onCancelClicked={ () => { setFocusedKeyIndex(-1); } }
                onApplyClicked={ onKeyInfoChanged }/>

            <KeyInfoDialog
                keyInfo={ newKeyInfo }
                onCancelClicked={ () => { setNewKeyInfo(null); } }
                onApplyClicked={ onKeyInfoAdded }/>

        </div>
    );
}

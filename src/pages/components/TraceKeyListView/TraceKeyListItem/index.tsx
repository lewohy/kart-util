import React, { SyntheticEvent } from 'react';
import './style.scss';
import { TraceKeyInfo } from '../../../ts/config';
import { Remove, Delete, Clear } from '@material-ui/icons';
import { Switch, IconButton } from '@material-ui/core';

type TraceKeyListViewItemProp = {
    index: number;
    keyInfo: TraceKeyInfo;
    onKeyInfoDeleteButtonClicked: (index: number) => void;
    onKeyInfoClicked: (index: number, keyInfo: TraceKeyInfo) => void;
};

export default function TraceKeyListViewItem(props: Readonly<TraceKeyListViewItemProp>) {
    const [keyInfo, setKeyInfo] = React.useState(props.keyInfo);

    let onItemClick = (event: SyntheticEvent) => {
        props.onKeyInfoClicked(props.index, keyInfo);
    }

    let onKeyInfoDeleteButtonClick = (event: SyntheticEvent) => {
        event.stopPropagation();

        props.onKeyInfoDeleteButtonClicked(props.index);
    };

    React.useEffect(() => {
        setKeyInfo(props.keyInfo);
    }, [props.keyInfo]);

    return (
        <div
            className="trace-key-list-view-item"
            onClick={ onItemClick }>
            
            <div
                className="name-area">
                { keyInfo.name }
            </div>

            <div
                className="right-area"
                >

                <IconButton
                    className="trace-key-delete-button"
                    size="small"
                    onClick={ onKeyInfoDeleteButtonClick }>
                        <Clear/>
                </IconButton>
            </div>
        </div>
    );
}

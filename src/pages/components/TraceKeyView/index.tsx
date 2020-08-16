import React from 'react';
import './style.scss';
import { TraceKeyInfo } from '../../ts/config';
import { Keyboard } from '../../ts/addon';
import TraceView from './TraceView';

type TraceKeyViewProp = {
    index: number;
    keyInfo: TraceKeyInfo;
    tick: number;
};

export default function TraceKeyView(props: Readonly<TraceKeyViewProp>) {
    const [code, setCode] = React.useState(props.keyInfo.code);
    const [pressed, setPressed] = React.useState(false);

    let onKeyStateChanged = (keyState: number) => {
        setPressed(keyState === 128);
        console.log(keyState);
    };

    React.useEffect(() => {
        setCode(props.keyInfo.code);
        Keyboard.register(props.keyInfo.code, 0, props.index, onKeyStateChanged);
    }, []);

    React.useEffect(() => {
        Keyboard.unregister(code, 0, props.index);
        Keyboard.register(props.keyInfo.code, 0, props.index, onKeyStateChanged);
        setCode(props.keyInfo.code);
    }, [props.keyInfo]);

    return (
        <div
            className="trace-key-view"
            style={{
                width: props.keyInfo.width,
                height: '100%',
                left: props.keyInfo.x
            }}>

            <TraceView
                style={{
                    width: '100%',
                    height: `calc(100% - ${props.keyInfo.height}px)`
                }}
                tick={ props.tick }
                pressed={ pressed }/>

            <div
                id={ props.keyInfo.name }
                className="trace-key"
                style={{
                    width: '100%',
                    height: props.keyInfo.height
                }}>

            </div>
        </div>
    );
}

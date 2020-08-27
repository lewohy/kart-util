import React from 'react';
import './style.scss';
import { TraceKeyInfo } from '../../ts/config';
import { Keyboard } from '../../ts/addon';
import TraceFrame from './TraceFrame';

type TraceKeyViewProp = {
    index: number;
    keyInfo: TraceKeyInfo;
    height: number;
    speed: number;
    tick: number;
};

export default function TraceKeyView(props: Readonly<TraceKeyViewProp>) {
    const [code, setCode] = React.useState(props.keyInfo.code);
    const [pressed, setPressed] = React.useState(false);

    let onKeyStateChanged = (keyState: number) => {
        setPressed(keyState === 128);
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
            className={ `trace-key-view ${pressed ? 'trace-key-view-pressed' : ''}` }
            style={{
                width: props.keyInfo.width,
                height: '100%',
                left: props.keyInfo.x
            }}>

            <TraceFrame
                style={{
                    width: '100%',
                    height: `calc(100% - ${props.keyInfo.height}px)`
                }}
                name={ props.keyInfo.name }
                height={ props.height }
                speed={ props.speed }
                tick={ props.tick }
                pressed={ pressed }/>

            <div
                id={ props.keyInfo.name }
                className={ `trace-key ${pressed ? 'trace-key-pressed' : ''}` }
                style={{
                    width: '100%',
                    height: props.keyInfo.height
                }}>

            </div>
        </div>
    );
}

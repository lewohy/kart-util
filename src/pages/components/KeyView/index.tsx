import React from 'react';
import './style.scss';
import { KeyInfo } from '../../ts/config';
import { Keyboard } from '../../ts/addon';

type KeyViewProp = {
    index: number;
    keyInfo: KeyInfo;
};

export default function KeyView(props: Readonly<KeyViewProp>) {
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

    return props.keyInfo.visible ? (
        <div
            id={ props.keyInfo.name }
            className={ `key-view ${pressed ? 'key-view-pressed' : ''}` }
            style={{
                width: props.keyInfo.width,
                height: props.keyInfo.height,
                top: props.keyInfo.y,
                left: props.keyInfo.x
            }}>
        </div>
    ) : null;
}

import React from 'react';
import './style.scss';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

type ButtonProp = {
    id?: string;
    className?: string;
    text?: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    iconSize?: number
    width?: number;
    height?: number;
    radius?: number;
    x?: number;
    y?: number;
    onClick?: () => void
};

export default function Button(props: Readonly<ButtonProp>) {
    
    return (
        <div
            id={props.id}
            className={`button ${props.className}`}
            style={{
                width: props.width,
                height: props.height,
                marginTop: props.y,
                marginLeft: props.x,
                borderRadius: props.radius ?? 4
            }}
            onClick={ props.onClick }
            onMouseMove= { e => {e.preventDefault()} }>

            {
                props.text ?? ''
            }

            {
                props.icon ?
                <props.icon style={{
                    fontSize: props.iconSize ?? 16
                }}/> :
                null
            }
        </div>
    );
}

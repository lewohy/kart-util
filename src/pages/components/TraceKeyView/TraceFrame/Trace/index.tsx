import React from 'react';
import './style.scss';

type TraceProp = {
    name: string;
    height: number;
    y: number;
};

export default function Trace(props: Readonly<TraceProp>) {

    return (
        <div
            id={ `${props.name}-trace` }
            className="trace"
            style={{
                width: '100%',
                height: props.height,
                bottom: props.y
            }}>

        </div>
    );
}

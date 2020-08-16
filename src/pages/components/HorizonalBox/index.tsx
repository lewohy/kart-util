import React from 'react';
import './style.scss';

export default function HorizontalBox(props: Readonly<{ children?: any }>) {
    return (
        <div
            className="horizontal-box">
            { props.children }
        </div>
    );
}

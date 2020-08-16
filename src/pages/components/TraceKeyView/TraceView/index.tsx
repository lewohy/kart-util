import React from 'react';
import './style.scss';

type TraceViewProp = {
    tick: number;
    pressed: boolean;
    style: React.CSSProperties;
};

type TraceInfo = {
    height: number;
    pressed: boolean;
};

export default function TraceView(props: Readonly<TraceViewProp>) {
    const [traceInfoList, setTraceInfoList] = React.useState(new Array<TraceInfo>());

    React.useEffect(() => {
        console.log(props.pressed);
    }, [props.tick]);

    return (
        <div
            className="trace-view"
            style={ props.style }>
            
        </div>
    );
}

import React from 'react';
import './style.scss';
import Trace from './Trace';
import { TraceKeyInfo } from '../../../ts/config';

type TraceViewProp = {
    name: string;
    height: number;
    speed: number;
    tick: number;
    pressed: boolean;
    style: React.CSSProperties;
};

type TraceInfo = {
    height: number;
    y: number;
    pressed: boolean;
};

export default function TraceFrame(props: Readonly<TraceViewProp>) {
    const [traceInfoList, setTraceInfoList] = React.useState(new Array<TraceInfo>());
    const [currentTraceInfo, setCurrentTraceInfo] = React.useState<TraceInfo>(null);

    let addTraceInfo = (traceInfo: TraceInfo): void => {
        setCurrentTraceInfo(traceInfo);
        traceInfoList.push(traceInfo);
    };

    React.useEffect(() => {
        for (let i = 0; i < traceInfoList.length; i++) {
            if (traceInfoList[i]) {
                if (traceInfoList[i].pressed) {
                    traceInfoList[i].height += props.speed;
                } else {
                    traceInfoList[i].y += props.speed;

                    if (traceInfoList[i].y >= props.height) {
                        traceInfoList.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    }, [props.tick]);

    React.useEffect(() => {
        if (props.pressed) {
            addTraceInfo({
                height: 0,
                y: 0,
                pressed: true
            });
        } else {
            if (currentTraceInfo) {
                currentTraceInfo.pressed = false;
            }
        }
    }, [props.pressed]);

    return (
        <div
            id={ `${props.name}-frame` }
            className="trace-frame"
            style={ props.style }>
            {
                traceInfoList.map((e, index) => {
                    if (e) {
                        return (
                            <Trace
                                key={ index }
                                name={ props.name }
                                height={ e.height }
                                y={ e.y }/>
                        );
                    }

                    return null;
                })
            }
        </div>
    );
}

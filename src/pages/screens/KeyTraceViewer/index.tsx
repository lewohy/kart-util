import React from 'react';
import { Config } from '../../ts/config';
import { ipcRenderer } from 'electron';
import TraceKeyView from '../../components/TraceKeyView';

export default function KeyTraceViewer(props: Readonly<{}>) {
    const [config, setConfig] = React.useState(Config.getConfig());
    const [tick, setTick] = React.useState(0);

    let refreshConfig = () => {
        let newConfig = Config.getConfig()
        setConfig(newConfig);

        ipcRenderer.send('resize-key-trace-viewer', newConfig.keyTraceViewer.width, newConfig.keyTraceViewer.height);
    };

    React.useEffect(()=> {
        refreshConfig();
        
        Config.registerConfigRefresh(() => {
            refreshConfig()
        });

        let tmp = 0;

        setInterval(() => {
            tmp += 10;
            setTick(tmp);
        }, 10);    
    }, []);

    return (
        <div>
            {
                config.keyTraceViewer.keyList.map((e, index) => {
                    return (
                        <TraceKeyView
                            key={ index }
                            index={ index }
                            keyInfo={ e }
                            tick={ tick }/>
                    );
                })
            }
        </div>
    );
}

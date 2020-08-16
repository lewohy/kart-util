import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { Settings } from '@material-ui/icons';
import './style.scss';
import { Config, KeyInfo } from '../../ts/config';
import KeyView from '../../components/KeyView';
import Button from '../../components/Button';
import { Keyboard } from '../../ts/addon';

export default function KeyViewer(props: Readonly<{}>) {
    const [config, setConfig] = React.useState(Config.getConfig());

    let refreshConfig = () => {
        let newConfig = Config.getConfig()
        setConfig(newConfig);

        ipcRenderer.send('resize-key-viewer', newConfig.keyViewer.width, newConfig.keyViewer.height);
    };

    let openSettingWindow = () => {
        ipcRenderer.send('open-setting');
    };

    useEffect(() => {
        refreshConfig();

        Config.registerConfigRefresh(() => {
            refreshConfig();
        });
    }, []);

    return (
        <div>
            {
                config.keyViewer.keyList.map((e, i) => {
                    return (
                        <KeyView
                            key={ i }
                            index= { i }
                            keyInfo={ e } />
                    );
                })
            }

            <Button
                id="setting-button"
                icon={ Settings }
                iconSize={ 16 }
                onClick={ openSettingWindow } />
        </div>
    );
}

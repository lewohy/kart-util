import React from 'react';
import './style.scss';
import { Config, KeyInfo } from '../../ts/config';
import { ipcRenderer } from 'electron';
import { Tabs, Tab, Box } from '@material-ui/core';
import KeyViewerSetting from '../../components/KeyViewerSetting';
import TeamScoreViewerSetting from '../../components/TeamScoreViewerSetting';
import KeyTraceViewerSetting from '../../components/KeyTraceViewerSetting';

export default function Setting(props: Readonly<{}>) {
    const [config, setConfig] = React.useState(Config.getConfig);
    const [tabIndex, setTabIndex] = React.useState(0);

    let onTabChange = (event: React.ChangeEvent, newValue: number) => {
        setTabIndex(newValue);
    };
    
    let refreshConfig = () => {
        setConfig(Config.getConfig());
    };

    let onKeyInfoAdded = (keyInfo: KeyInfo) => {
        config.keyViewer.keyList.push(keyInfo);
        config.save();
    };

    let onKeyInfoDeleteButtonClicked = (index: number) => {
        config.keyViewer.keyList.splice(index, 1);
        config.save();
    };

    let onKeyInfoChanged = (index: number, keyInfo: KeyInfo) => {
        config.keyViewer.keyList[index] = keyInfo;
        config.save();
    };

    React.useEffect(() => {
        Config.registerConfigRefresh(() => {
            refreshConfig();
        });
    }, []);
    

    return (
        <div
            className="setting">
            <Tabs
                className="tabs"
                orientation="vertical"
                variant="scrollable"
                value={ tabIndex }
                onChange={ onTabChange } >
                <Tab
                    label="Key Viewer"/>
                <Tab
                    label="Key Trace Viewer"/>
                <Tab
                    label="Team Score"/>
            </Tabs>

            <div
                className="tab-panel"
                hidden={ tabIndex !== 0 }>

                <KeyViewerSetting
                    keyViewer={ config.keyViewer }
                    onKeyInfoAdded={ onKeyInfoAdded }
                    onKeyInfoDeleteButtonClicked={ onKeyInfoDeleteButtonClicked }
                    onKeyInfoChanged={ onKeyInfoChanged }
                    onKeyViewerWidthChanged={ (width: number) => { config.keyViewer.width = width; config.save(); } }
                    onKeyViewerHeightChanged={ (height: number) => { config.keyViewer.height = height; config.save(); } } />

            </div>

            <div
                className="tab-panel"
                hidden={ tabIndex !== 1 }>

                <KeyTraceViewerSetting
                    keyTraceViewer={ config.keyTraceViewer }
                    />
            </div>

            <div
                className="tab-panel"
                hidden={ tabIndex !== 2 }>
                    
                <TeamScoreViewerSetting
                    teamScoreViewer={ config.teamScoreViewer }
                    onTeamScoreViewerEnableChanged={ (enabled: boolean) => { config.teamScoreViewer.enabled = enabled; config.save(); } }
                    onTeamScoreViewerWidthChanged={ (width: number) => { config.teamScoreViewer.width = width; config.save(); } }
                    onTeamScoreViewerHeightChanged={ (height: number) => { config.teamScoreViewer.height = height; config.save(); } }/>
            </div>
            
        </div>
    );
}
import React from 'react';
import './style.scss';
import { KeyViewer, KeyInfo, TeamScoreViewer } from '../../ts/config';
import KeyListView from '../KeyListView';
import HorizontalBox from '../HorizonalBox';
import { Typography, TextField } from '@material-ui/core';
import { Height } from '@material-ui/icons';
import TextProperty from '../TextProperty';
import SwitchProperty from '../SwitchProperty';
import { TeamScore } from '../../ts/addon';
import { ipcRenderer } from 'electron';

type TeamScoreViewerSettingProp = {
    teamScoreViewer: TeamScoreViewer;
    onTeamScoreViewerEnableChanged: (value: boolean) => void;
    onTeamScoreViewerWidthChanged: (value: number) => void;
    onTeamScoreViewerHeightChanged: (value: number) => void;
};

export default function TeamScoreViewerSetting(props: Readonly<TeamScoreViewerSettingProp>) {
    const [teamScoreViewer, setTeamScoreViewer] = React.useState(props.teamScoreViewer);

    let toggleTeamScoreViewer = (open: boolean) => {
        if (open) {
            ipcRenderer.send('open-team-score-viewer');
        } else {
            ipcRenderer.send('close-team-score-viewer');
        }

        props.onTeamScoreViewerEnableChanged(open);
    };
    
    let toNumberString = (str: string) => {
        let r = Number(str);
        
        return (r ? (r > 3000 ? 3000 : r) : '').toString();
    };

    React.useEffect(() => {
        setTeamScoreViewer(props.teamScoreViewer);
    }, [props.teamScoreViewer]);

    return (
        <div>
            <div
                style={{
                    margin: "0px 8px"
                }}>
                    
                <SwitchProperty
                    name="팀 점수 보기"
                    defaultValue={ props.teamScoreViewer.enabled }
                    onValueChanged={ toggleTeamScoreViewer }/>

                <TextProperty
                    name="Score Viewer Width"
                    defaultValue={ teamScoreViewer.width.toString() }
                    valueConverter={ toNumberString }
                    onValueChanged={ (value) => { props.onTeamScoreViewerWidthChanged(Number(value)); }}/>

                <TextProperty
                    name="Score Viewer Height"
                    defaultValue={ teamScoreViewer.width.toString() }
                    valueConverter={ toNumberString }
                    onValueChanged={ (value) => { props.onTeamScoreViewerHeightChanged(Number(value)); }}/>
            </div>
        </div>
    );
}

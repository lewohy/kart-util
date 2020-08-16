import React from 'react';
import { TeamScore, Keyboard } from '../../ts/addon';
import RankingItem from '../../components/RankingItem';
import { Config } from '../../ts/config';
import { ipcRenderer } from 'electron';

export default function TeamScoreViewer(props: Readonly<{}>) {
    const [config, setConfig] = React.useState(Config.getConfig());
    const [ranking, setRanking] = React.useState(new Array<number>(8));

    let refreshConfig = () => {
        let newConfig = Config.getConfig()
        setConfig(newConfig);

        ipcRenderer.send('resize-team-score-viewer', newConfig.teamScoreViewer.width, newConfig.teamScoreViewer.height);
    };

    React.useEffect(()=> {
        refreshConfig();
        
        Config.registerConfigRefresh(() => {
            refreshConfig();
        });

        setInterval(() => {
            let ranking = TeamScore.getTeamRanking();
            
            setRanking(ranking);
        }, 1000);
    }, []);

    return (
        <div
            className="team-score-viewer">
            {
                [0, 0, 0, 0, 0, 0, 0, 0].map((e, index) => {
                    return (
                        <RankingItem
                            key={ index }
                            index={ index } 
                            ranking={ ranking }/>
                    );
                })
            }
        </div>
    );
}

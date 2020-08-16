import React from 'react';

const SCORE_LIST = [10, 8, 6, 5, 4, 3, 2, 1];

type RankingItemProps = {
    index: number;
    ranking: Array<number>
};

export default function RankingItem(props: Readonly<RankingItemProps>) {
    const [redScore, setRedScore] = React.useState(0);
    const [blueScore, setBlueScore] = React.useState(0);

    let getWinnerTeam = () => {
        if (redScore === 0 && blueScore === 0) {
            return 0;
        } else if (redScore > blueScore) {
            return 1;
        } else if (redScore < blueScore) {
            return 2;
        }
        
        return props.ranking[0];
    };

    React.useEffect(() => {
        let scores = [0, 0, 0];

        for (let i = 0; i <= props.index; i++) {
            scores[props.ranking[i]] += SCORE_LIST[i];
        }

        setRedScore(scores[1]);
        setBlueScore(scores[2]);
    }, [props.ranking]);

    return (
        <div
            className={ `ranking-item ${getWinnerTeam() === 1 ? 'red-win' : (getWinnerTeam() === 2 ? 'blue-win' : '')}` }>

            <div
                className="blue-score-view">
                { blueScore }
            </div>

            <div
                className="rank-view">
                { props.index + 1 }
            </div>

            <div
                className="red-score-view">
                { redScore }
            </div>
        </div>
    );
}

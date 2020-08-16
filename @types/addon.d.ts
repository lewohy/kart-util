declare type Addon = {
    runKeyboardObserver(resultCallback: (code: number, message: string) => void, listenerCallback: (keyCode: number, keyState: number) => void): void;
    runTeamScoreAnalyzer(): number;
    getTeamRanking(): Array<number>;
};

declare function __non_webpack_require__(id: string);

import { ipcRenderer } from 'electron';

const addon: Addon = __non_webpack_require__(ipcRenderer.sendSync('get-cwd') + '/build/Release/binding.node');

export class Keyboard {
    private static keyCallbackList: Array<Array<Array<(keyState: number) => void>>>;
    private static allKeyCallbackList: Array<(keyCode: number, keyState: number) => void>;

    public static initialize(): void {
        Keyboard.keyCallbackList = new Array<Array<Array<(keyState: number) => void>>>();
        Keyboard.allKeyCallbackList = new Array<(keyCode: number, keyState: number) => void>();

        addon.runKeyboardObserver((code, message) => {
        
        }, (keyCode, keyState) => {
            if (this.allKeyCallbackList.length > 0) {
                this.allKeyCallbackList.forEach(e => e(keyCode, keyState));
                this.allKeyCallbackList = [];
            }
            
            for (let i = 0; i < Keyboard.keyCallbackList.length; i++) {
                Keyboard.keyCallbackList[i][keyCode].forEach(e => e(keyState));
                console.log(Keyboard.keyCallbackList);
            }
        });
    }

    public static register(keyCode: number, type: number, id: number, callback: (keyState: number) => void): void {
        if (!Keyboard.keyCallbackList[type]) {
            Keyboard.keyCallbackList[type] = new Array<Array<(keyState: number) => void>>();
        }

        if (!Keyboard.keyCallbackList[type][keyCode]) {
            Keyboard.keyCallbackList[type][keyCode] = new Array<(keyState: number) => void>();
        }

        Keyboard.keyCallbackList[type][keyCode][id] = callback;
    }

    public static unregister(keyCode: number, type: number, id: number): void {
        if (Keyboard.keyCallbackList[type]) {
            if (Keyboard.keyCallbackList[type][keyCode]) {
                Keyboard.keyCallbackList[type][keyCode].splice(id, 1);
            }
        }
    }

    public static detectKey(id: number, callback: (keyCode: number, keyState: number) => void): void {
        Keyboard.allKeyCallbackList[id] = callback;
    }

    public static removeCallback(id: number): void {
        if (Keyboard.allKeyCallbackList.length - 1 >= id) {
            Keyboard.allKeyCallbackList.splice(id, 1);
        }
    }
}

export class TeamScore {
    
    public static initialize(): void {
        addon.runTeamScoreAnalyzer();
    }

    public static getTeamRanking(): Array<number> {
        return addon.getTeamRanking();
    }
}

Keyboard.initialize();
TeamScore.initialize();

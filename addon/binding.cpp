#include <napi.h>
#include <stdio.h>
#include "key-hooker.h"
#include "team-score.h"

namespace lewohy {
    using namespace Napi;

    Object Init(Env env, Object exports) {
        exports.Set(String::New(env, "runKeyboardObserver"), Function::New(env, RunKeyboardObserver));
        exports.Set(String::New(env, "runTeamScoreAnalyzer"), Function::New(env, RunTeamScoreAnalyzer));
        exports.Set(String::New(env, "getTeamRanking"), Function::New(env, GetTeamRanking));

        return exports;
    }

    NODE_API_MODULE(lewohyModule, Init)
}
#pragma once
#include <napi.h>

namespace lewohy {
    using namespace Napi;

    void SendResult(int code, const char* str);
    void KeyboardObserverThread();
    Number RunKeyboardObserver(const CallbackInfo& info);
}

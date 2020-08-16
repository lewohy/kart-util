#include <napi.h>
#include <stdio.h>
#include <dinput.h>
#include "key-hooker.h"

#pragma comment(lib, "dinput8.lib")
#pragma comment(lib, "dxguid.lib")

namespace lewohy {
    using namespace Napi;

    ThreadSafeFunction result_tsfn;
    ThreadSafeFunction key_listener_tsfn;

    void SendResult(int code, const char* str) {
        result_tsfn.BlockingCall([code, str](Env env, Function callback) {
            callback.Call({
                Number::New(env, code),
                String::New(env, str)
            });
        });
    }

    void KeyboardObserverThread() {
        unsigned char current_keyboard_state[256];
        unsigned char old_keyboard_state[256];

        IDirectInput8* direct_input;
        IDirectInputDevice8* keyboard;

        HRESULT result;

        result = DirectInput8Create(GetModuleHandle(NULL), DIRECTINPUT_VERSION, IID_IDirectInput8, (void**) &direct_input, NULL);

        if (FAILED(result)) {
            SendResult(0, "Failed: DirectInput8Create");
            return;
        }

        result = direct_input->CreateDevice(GUID_SysKeyboard, &keyboard, nullptr);

        if (FAILED(result)) {
            SendResult(0, "Failed: CreateDevice");
            return;
        }

        result = keyboard->SetDataFormat(&c_dfDIKeyboard);

        if (FAILED(result)) {
            SendResult(0, "Failed: SetDataFormat");
            return;
        }

        result = keyboard->Acquire();
        
        if (FAILED(result)) {
            SendResult(0, "Failed: Acquire");
            return;
        }

        SendResult(1, "Successed");

        while (true) {
            result = keyboard->GetDeviceState(256, (LPVOID) &current_keyboard_state);

            if (FAILED(result)) {
                continue;
            }

            for (int i = 0; i < 256; i++) {
                if (current_keyboard_state[i] != old_keyboard_state[i]) {
                    int n = i;
                    
                    key_listener_tsfn.BlockingCall(&n, [&current_keyboard_state, &old_keyboard_state](Env env, Function callback, int *i) {
                        callback.Call({
                            Number::New(env, *i),
                            Number::New(env, current_keyboard_state[*i])
                        });

                        //printf("%d\n", *i);

                        old_keyboard_state[*i] = current_keyboard_state[*i];
                    });
                }
            }

            Sleep(10);
        }
    }
    
    Number RunKeyboardObserver(const CallbackInfo& info) {
        Env env = info.Env();

        if (info.Length() == 2) {
            if (info[0].IsFunction() && info[1].IsFunction()) {
                
                result_tsfn = ThreadSafeFunction::New(env, info[0].As<Function>(), "ResultCallback", 0, 1, [](Env env) { });
                key_listener_tsfn = ThreadSafeFunction::New(env, info[1].As<Function>(), "ListenerCallback", 0, 1, [](Env env) { });

                std::thread thread(KeyboardObserverThread);
            }
        }
        
        return Number::New(env, 0);
    }
}

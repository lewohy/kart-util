#pragma once
#include <napi.h>
#include <Windows.h>
#include <opencv2/opencv.hpp>

namespace lewohy {
    using namespace Napi;

    class TeamScoreAnalyzer {
    public:
        int rank[8];

        TeamScoreAnalyzer();
        void Run();
    private:
        std::thread thread;
        HWND hWnd;
        HDC hDC, hCompatibleDC;
        HBITMAP hbWindow;
        BITMAPINFOHEADER  bi;
        cv::Mat originImage;
        cv::Mat bgrImage;
        int width, height;
        int timeoutTimer;

        void Analyze(cv::Mat& image);
        cv::Mat& GetRedMaskImage(cv::Mat& image);
        cv::Mat& GetBlueMaskImage(cv::Mat& image);
        void Setup();
        cv::Mat& CaptureScreen();
        HWND GetKartRiderClientHwnd();
    };

    Number RunTeamScoreAnalyzer(const CallbackInfo& info);
    Array GetTeamRanking(const CallbackInfo& info);
}

#include <napi.h>
#include <stdio.h>
#include <Windows.h>
#include <vector>
#include <opencv2/opencv.hpp>
#include "team-score.h";

namespace lewohy {
    using namespace Napi;

    TeamScoreAnalyzer analyzer;

    TeamScoreAnalyzer::TeamScoreAnalyzer() : timeoutTimer(0), width(0), height(0) {

    }

    void TeamScoreAnalyzer::Run() {
        while (true) {
            for (int i = 0; i < 8; i++) {
                this->rank[i] = 0;
            }

            this->hWnd = this->GetKartRiderClientHwnd();            // 클라이어트가 켜질 때 까지 대기
            this->hDC = GetDC(this->hWnd);                          // 가져온 HWND로 DC 얻기
            this->hCompatibleDC = CreateCompatibleDC(this->hDC);    // 이미지 DC?

            while (true) {
                cv::waitKey(10);

                if (!IsWindow(this->hWnd)) {            // 닫혀있으면 다시 클라 켜질 때 까지 대기하도록 돌아감
                    break;
                } else if (IsIconic(this->hWnd)) {      // 최소화 상태에서는 작동시키지 않음
                    for (int i = 0; i < 8; i++) {
                        this->rank[i] = 0;
                    }
                    
                    continue;
                }

                if (this->width == 0 && this->height == 0) {
                    this->Setup();
                }

                this->CaptureScreen();

                this->Analyze(this->bgrImage);
            }

            Sleep(1000);
        }
    }
    
    void TeamScoreAnalyzer::Analyze(cv::Mat& image) {
        static std::vector<std::vector<cv::Point>> redContours;     // 레드팀 아이콘 컨투어
        static std::vector<std::vector<cv::Point>> blueContours;    // 블루팀 아이콘 컨투어
        static cv::Rect rect(20, 230, 50 - 20, 432 - 230);          // 순위 표시 구역 
        static cv::Mat redImage;
        static cv::Mat blueImage;
        static int redCount, blueCount;
        static int red, blue;
        static int i;

        image = image(rect);                                        // CROP
        cv::GaussianBlur(image, image, cv::Size(21, 21), 1);        // Gaussian
        cv::cvtColor(image, image, cv::COLOR_BGR2HSV);              // to HSV

        redImage = this->GetRedMaskImage(image);                    // 레드 부분만 가져옴
        blueImage = this->GetBlueMaskImage(image);                  // 블루 부분만 가져옴

        cv::findContours(redImage, redContours, cv::RETR_LIST, cv::CHAIN_APPROX_SIMPLE);
        cv::findContours(blueImage, blueContours, cv::RETR_LIST, cv::CHAIN_APPROX_SIMPLE);

        redCount = redContours.size();
        blueCount = blueContours.size();

        if (redCount == 4 && blueCount == 4) {          // 일단은 4 : 4 경우만 판단함
            this->timeoutTimer = 0;

            red = 0;
            blue = 0;

            for (i = 0; i < redCount + blueCount; i++) {
                if (red == redCount) {
                    blue++;
                    this->rank[7 - i] = 2;
                } else if (blue == blueCount) {
                    red++;
                    this->rank[7 - i] = 1;
                } else if (redContours[red][0].y > blueContours[blue][0].y) {
                    red++;
                    this->rank[7 - i] = 1;
                } else if (redContours[red][0].y < blueContours[blue][0].y) {
                    blue++;
                    this->rank[7 - i] = 2;
                }
            }
            
        } else {                                        // 인식할 수 없는 경우가 지속되면 계산 결과를 저장하지 않음
            this->timeoutTimer++;

            if (this->timeoutTimer > 200) {
                for (i = 0; i < 8; i++) {
                    this->rank[i] = 0;
                }
            }
        }
    }
    
    cv::Mat& TeamScoreAnalyzer::GetRedMaskImage(cv::Mat& image) {
       static cv::Mat lower;
       static cv::Mat upper;
       static cv::Mat result;

        static cv::Scalar lowerBlueRange[] = {
            cv::Scalar(0, 50, 200),
            cv::Scalar(10, 255, 255)
        };

        static cv::Scalar upperBlueRange[] = {
            cv::Scalar(170, 50, 200),
            cv::Scalar(180, 255, 255)
        };
        
        inRange(image, lowerBlueRange[0], lowerBlueRange[1], lower);
        inRange(image, upperBlueRange[0], upperBlueRange[1], upper);

        result = lower + upper;

        erode(result, result, getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(3, 3)));
        dilate(result, result, getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(3, 3)));

        dilate(result, result, getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(6, 6)));
        erode(result, result, getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(6, 6)));

        return result;
    }
    
    cv::Mat& TeamScoreAnalyzer::GetBlueMaskImage(cv::Mat& image) {
        static cv::Mat result;

        static cv::Scalar redRange[] = {
            cv::Scalar(100, 50, 200),
            cv::Scalar(120, 255, 255)
        };
        
        inRange(image, redRange[0], redRange[1], result);

        erode(result, result, getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(4, 4)));
        dilate(result, result, getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(4, 4)));

        dilate(result, result, getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(8, 8)));
        erode(result, result, getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(8, 8)));

        return result;
    }

    void TeamScoreAnalyzer::Setup() {
        RECT rect;
        GetClientRect(hWnd, &rect);

        this->width = rect.right - rect.left;
        this->height = rect.bottom - rect.top;

        this->bi.biSize = sizeof(BITMAPINFOHEADER);
        this->bi.biWidth = this->width;
        this->bi.biHeight = -this->height;  //this is the line that makes it draw upside down or not - 뭔소린지 모름, 왜 -붙이는지도 모름
        this->bi.biPlanes = 1;
        this->bi.biBitCount = 32;
        this->bi.biCompression = BI_RGB;
        this->bi.biSizeImage = 0;
        this->bi.biXPelsPerMeter = 0;
        this->bi.biYPelsPerMeter = 0;
        this->bi.biClrUsed = 0;
        this->bi.biClrImportant = 0;

        this->originImage.create(this->height, this->width, CV_8UC4);

        this->hbWindow = CreateCompatibleBitmap(hDC, this->width, this->height);

        SelectObject(this->hCompatibleDC, this->hbWindow);
    }

    cv::Mat& TeamScoreAnalyzer::CaptureScreen() {
        StretchBlt(this->hCompatibleDC, 0, 0, this->width, this->height, this->hDC, 0, 0, this->width, this->height, SRCCOPY);
        GetDIBits(this->hCompatibleDC, this->hbWindow, 0, this->height, this->originImage.data, (BITMAPINFO*)&bi, DIB_RGB_COLORS);

        cv::cvtColor(this->originImage, this->bgrImage, cv::COLOR_BGRA2BGR);

        return this->bgrImage;
    }

    HWND TeamScoreAnalyzer::GetKartRiderClientHwnd() {
        HWND hWnd;

        while (true) {
            hWnd = FindWindowW(NULL, L"KartRider Client");

            if (IsWindow(hWnd)) {
                return hWnd;
            }

            Sleep(1000);
        }
    }

    Array GetTeamRanking(const CallbackInfo& info) {
        Env env = info.Env();
        
        Array array = Array::New(env, 8);

        for (int i = 0; i < 8; i++) {
            array[i] = analyzer.rank[i];
        }

        return array;
    }
    
    Number RunTeamScoreAnalyzer(const CallbackInfo& info) {
        Env env = info.Env();
        
        std::thread t([]() {
            std::invoke([]() {
                analyzer.Run();
            });
        });

        return Number::New(env, 0);
    }
}

{
    "targets": [
        {
            "target_name": "binding",
            "sources": [
                "./addon/binding.cpp",
                "./addon/key-hooker.cpp",
                "./addon/team-score.cpp"
            ],
            "include_dirs": [
                "D:\\opencv\\cmake_build\\install\\include",
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "libraries": [
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\ade.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\IlmImf.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\ippicvmt.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\ippiw.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\ittnotify.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\libjasper.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\libjpeg-turbo.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\libpng.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\libprotobuf.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\libtiff.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\libwebp.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_calib3d420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_core420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_dnn420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_features2d420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_flann420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_gapi420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_highgui420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_imgcodecs420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_imgproc420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_ml420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_objdetect420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_photo420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_stitching420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_video420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\opencv_videoio420.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\quirc.lib",
                "D:\\opencv\\cmake_build\\install\\x64\\vc16\\staticlib\\zlib.lib"
            ],
            "configurations": {
                "Release": {
                    "msvs_settings": {
                        "VCCLCompilerTool": {
                            "RuntimeLibrary": 0
                        }
                    }
                }
            },
            "defines": [
                "NAPI_DISABLE_CPP_EXCEPTIONS"
            ]
        }
    ]
}

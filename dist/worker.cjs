var $iCJSG$worker_threads = require("worker_threads");
var $iCJSG$zeddwin32api = require("zedd-win32-api");
var $iCJSG$refstructdi = require("ref-struct-di");
var $iCJSG$ffinapi = require("ffi-napi");
var $iCJSG$refnapi = require("ref-napi");
var $iCJSG$win32def = require("win32-def");
var $iCJSG$windowsffi = require("windows-ffi");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}






let $08653a48229a6359$export$1fbf6ae150f5289f;
(function(IgtState1) {
    IgtState1[IgtState1["UNKNOWN"] = 0] = "UNKNOWN";
    IgtState1[IgtState1["NO_GAME"] = 1] = "NO_GAME";
    IgtState1[IgtState1["PLAYING"] = 2] = "PLAYING";
    IgtState1[IgtState1["LOADING"] = 3] = "LOADING";
})($08653a48229a6359$export$1fbf6ae150f5289f || ($08653a48229a6359$export$1fbf6ae150f5289f = {}));
(0, $iCJSG$zeddwin32api.U).apiDef["SetProcessDPIAware"] = [
    (0, $iCJSG$win32def.DTypes).BOOL,
    []
];
(0, $iCJSG$zeddwin32api.U).apiDef["GetClientRect"] = [
    (0, $iCJSG$win32def.DTypes).BOOL,
    [
        (0, $iCJSG$win32def.DTypes).HWND,
        (0, $iCJSG$win32def.DTypes).RECT
    ]
];
(0, $iCJSG$zeddwin32api.U).apiDef["ClientToScreen"] = [
    (0, $iCJSG$win32def.DTypes).BOOL,
    [
        (0, $iCJSG$win32def.DTypes).HWND,
        (0, $iCJSG$win32def.DTypes).LPPOINT
    ]
];
const $08653a48229a6359$var$user32 = (0, $iCJSG$zeddwin32api.U).load();
const $08653a48229a6359$var$Struct = (0, ($parcel$interopDefault($iCJSG$refstructdi)))($iCJSG$refnapi);
let $08653a48229a6359$var$igtState = $08653a48229a6359$export$1fbf6ae150f5289f.UNKNOWN;
let $08653a48229a6359$var$hwnd = 0;
let $08653a48229a6359$var$tickTime = 500;
let $08653a48229a6359$var$timer;
let $08653a48229a6359$var$callback = (state)=>{};
$08653a48229a6359$var$user32.SetProcessDPIAware();
const $08653a48229a6359$export$5801d716674e6bb6 = (igtCallback)=>{
    $08653a48229a6359$var$callback = igtCallback;
};
const $08653a48229a6359$export$a679630bf91eb455 = ()=>{
    $08653a48229a6359$var$igtState = $08653a48229a6359$export$1fbf6ae150f5289f.UNKNOWN;
    $08653a48229a6359$var$hwnd = 0;
    $08653a48229a6359$var$timer = setTimeout($08653a48229a6359$var$tickProcessIgt, $08653a48229a6359$var$tickTime);
};
const $08653a48229a6359$export$cb0b9fb431e2932b = ()=>{
    clearInterval($08653a48229a6359$var$timer);
};
const $08653a48229a6359$var$runCallbackIfChanged = (state)=>{
    if (state != $08653a48229a6359$var$igtState) {
        $08653a48229a6359$var$igtState = state;
        $08653a48229a6359$var$callback($08653a48229a6359$var$igtState);
    }
};
const $08653a48229a6359$var$tickProcessIgt = ()=>{
    $08653a48229a6359$var$timer = setTimeout(()=>{
        $08653a48229a6359$var$processIgt();
        $08653a48229a6359$var$tickProcessIgt();
    }, $08653a48229a6359$var$tickTime);
};
const $08653a48229a6359$var$enumWindowsProc = $iCJSG$ffinapi.Callback((0, $iCJSG$win32def.DTypes).BOOL, [
    (0, $iCJSG$win32def.DTypes).HWND,
    (0, $iCJSG$win32def.DTypes).LPARAM
], (window, lParam)=>{
    const buf = Buffer.alloc(254);
    $08653a48229a6359$var$user32.GetWindowTextW(window, buf, buf.byteLength);
    if (buf.toString("ucs2").replace(/\0+$/, "") == "Diablo II: Resurrected") {
        $08653a48229a6359$var$hwnd = window;
        return false;
    }
    return true;
});
const $08653a48229a6359$var$noGame = ()=>{
    $08653a48229a6359$var$runCallbackIfChanged($08653a48229a6359$export$1fbf6ae150f5289f.NO_GAME);
    $08653a48229a6359$var$hwnd = 0;
    $08653a48229a6359$var$tickTime = 500;
};
const $08653a48229a6359$var$gameLoading = ()=>{
    $08653a48229a6359$var$runCallbackIfChanged($08653a48229a6359$export$1fbf6ae150f5289f.LOADING);
    $08653a48229a6359$var$tickTime = 10;
};
const $08653a48229a6359$var$gamePlaying = ()=>{
    $08653a48229a6359$var$runCallbackIfChanged($08653a48229a6359$export$1fbf6ae150f5289f.PLAYING);
    $08653a48229a6359$var$tickTime = 10;
};
const $08653a48229a6359$var$processIgt = ()=>{
    if ($08653a48229a6359$var$hwnd === 0) {
        $08653a48229a6359$var$user32.EnumWindows($08653a48229a6359$var$enumWindowsProc, 0);
        if ($08653a48229a6359$var$hwnd === 0) {
            $08653a48229a6359$var$noGame();
            return;
        }
    }
    /** @ts-ignore */ const origin = new $08653a48229a6359$var$Struct((0, $iCJSG$win32def.DStruct).POINT)();
    const retw = $08653a48229a6359$var$user32.ClientToScreen($08653a48229a6359$var$hwnd, origin.ref());
    if (retw == 0) {
        $08653a48229a6359$var$noGame();
        return;
    }
    /** @ts-ignore */ const rectClient = new $08653a48229a6359$var$Struct((0, $iCJSG$win32def.DStruct).RECT)();
    const ret = $08653a48229a6359$var$user32.GetClientRect($08653a48229a6359$var$hwnd, rectClient.ref());
    if (ret == 0) {
        $08653a48229a6359$var$noGame();
        return;
    }
    const w = rectClient.right;
    const h = rectClient.bottom;
    const x = origin.x;
    const y = origin.y;
    const screenshot = (0, $iCJSG$windowsffi.CaptureScreenshot)({
        rectToCapture: new (0, $iCJSG$windowsffi.VRect)(x + Math.round(w / 2) - 100, y + h - 1, 200, 1)
    });
    const isLoading = screenshot.GetPixel(0, 0).ToHex_RGB() == "000000" && screenshot.GetPixel(100, 0).ToHex_RGB() == "000000" && screenshot.GetPixel(199, 0).ToHex_RGB() == "000000";
    if (isLoading) $08653a48229a6359$var$gameLoading();
    else $08653a48229a6359$var$gamePlaying();
};



if (0, $iCJSG$worker_threads.parentPort) {
    (0, $iCJSG$worker_threads.parentPort).once("message", (message)=>{
        if (message.type != "igt") return;
        if (message.action == "startIgt") (0, $08653a48229a6359$export$a679630bf91eb455)();
        if (message.action == "stopIgt") (0, $08653a48229a6359$export$cb0b9fb431e2932b)();
    });
    (0, $08653a48229a6359$export$5801d716674e6bb6)((state)=>{
        if (0, $iCJSG$worker_threads.parentPort) (0, $iCJSG$worker_threads.parentPort).postMessage({
            type: "igt",
            state: state
        });
    });
}


//# sourceMappingURL=worker.cjs.map

var $kpofC$zeddwin32api = require("zedd-win32-api");
var $kpofC$refstructdi = require("ref-struct-di");
var $kpofC$ffinapi = require("ffi-napi");
var $kpofC$refnapi = require("ref-napi");
var $kpofC$win32def = require("win32-def");
var $kpofC$windowsffi = require("windows-ffi");

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
(0, $kpofC$zeddwin32api.U).apiDef["SetProcessDPIAware"] = [
    (0, $kpofC$win32def.DTypes).BOOL,
    []
];
(0, $kpofC$zeddwin32api.U).apiDef["GetClientRect"] = [
    (0, $kpofC$win32def.DTypes).BOOL,
    [
        (0, $kpofC$win32def.DTypes).HWND,
        (0, $kpofC$win32def.DTypes).RECT
    ]
];
(0, $kpofC$zeddwin32api.U).apiDef["ClientToScreen"] = [
    (0, $kpofC$win32def.DTypes).BOOL,
    [
        (0, $kpofC$win32def.DTypes).HWND,
        (0, $kpofC$win32def.DTypes).LPPOINT
    ]
];
const $08653a48229a6359$var$user32 = (0, $kpofC$zeddwin32api.U).load();
const $08653a48229a6359$var$Struct = (0, ($parcel$interopDefault($kpofC$refstructdi)))($kpofC$refnapi);
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
const $08653a48229a6359$var$enumWindowsProc = $kpofC$ffinapi.Callback((0, $kpofC$win32def.DTypes).BOOL, [
    (0, $kpofC$win32def.DTypes).HWND,
    (0, $kpofC$win32def.DTypes).LPARAM
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
    /** @ts-ignore */ const origin = new $08653a48229a6359$var$Struct((0, $kpofC$win32def.DStruct).POINT)();
    const retw = $08653a48229a6359$var$user32.ClientToScreen($08653a48229a6359$var$hwnd, origin.ref());
    if (retw == 0) {
        $08653a48229a6359$var$noGame();
        return;
    }
    /** @ts-ignore */ const rectClient = new $08653a48229a6359$var$Struct((0, $kpofC$win32def.DStruct).RECT)();
    const ret = $08653a48229a6359$var$user32.GetClientRect($08653a48229a6359$var$hwnd, rectClient.ref());
    if (ret == 0) {
        $08653a48229a6359$var$noGame();
        return;
    }
    const w = rectClient.right;
    const h = rectClient.bottom;
    const x = origin.x;
    const y = origin.y;
    const screenshot = (0, $kpofC$windowsffi.CaptureScreenshot)({
        rectToCapture: new (0, $kpofC$windowsffi.VRect)(x + Math.round(w / 2) - 100, y + h - 1, 200, 1)
    });
    const isLoading = screenshot.GetPixel(0, 0).ToHex_RGB() == "000000" && screenshot.GetPixel(100, 0).ToHex_RGB() == "000000" && screenshot.GetPixel(199, 0).ToHex_RGB() == "000000";
    if (isLoading) $08653a48229a6359$var$gameLoading();
    else $08653a48229a6359$var$gamePlaying();
};


(0, $08653a48229a6359$export$5801d716674e6bb6)((state)=>{
    let stateStr = "";
    switch(state){
        case (0, $08653a48229a6359$export$1fbf6ae150f5289f).LOADING:
            stateStr = "Loading";
            break;
        case (0, $08653a48229a6359$export$1fbf6ae150f5289f).PLAYING:
            stateStr = "Playing";
            break;
        case (0, $08653a48229a6359$export$1fbf6ae150f5289f).NO_GAME:
            stateStr = "No game";
            break;
        default:
            stateStr = "Unknown";
    }
    console.log("State changed to: " + stateStr);
});
(0, $08653a48229a6359$export$a679630bf91eb455)();
console.log("test");
setInterval(()=>{}, 1000);


//# sourceMappingURL=cli.cjs.map

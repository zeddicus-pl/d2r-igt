var $1AwR2$buffer = require("buffer");
var $1AwR2$zeddwin32api = require("zedd-win32-api");
var $1AwR2$refstructdi = require("ref-struct-di");
var $1AwR2$ffinapi = require("ffi-napi");
var $1AwR2$refnapi = require("ref-napi");
var $1AwR2$win32def = require("win32-def");
var $1AwR2$windowsffi = require("windows-ffi");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "IgtState", () => $03112ec43cdf56af$export$1fbf6ae150f5289f);
$parcel$export(module.exports, "setIgtCallback", () => $03112ec43cdf56af$export$5801d716674e6bb6);
$parcel$export(module.exports, "startIgt", () => $03112ec43cdf56af$export$a679630bf91eb455);
$parcel$export(module.exports, "stopIgt", () => $03112ec43cdf56af$export$cb0b9fb431e2932b);







var $03112ec43cdf56af$require$Buffer = $1AwR2$buffer.Buffer;
let $03112ec43cdf56af$export$1fbf6ae150f5289f;
(function(IgtState) {
    IgtState[IgtState["UNKNOWN"] = 0] = "UNKNOWN";
    IgtState[IgtState["NO_GAME"] = 1] = "NO_GAME";
    IgtState[IgtState["PLAYING"] = 2] = "PLAYING";
    IgtState[IgtState["LOADING"] = 3] = "LOADING";
})($03112ec43cdf56af$export$1fbf6ae150f5289f || ($03112ec43cdf56af$export$1fbf6ae150f5289f = {}));
(0, $1AwR2$zeddwin32api.U).apiDef["SetProcessDPIAware"] = [
    (0, $1AwR2$win32def.DTypes).BOOL,
    []
];
(0, $1AwR2$zeddwin32api.U).apiDef["GetClientRect"] = [
    (0, $1AwR2$win32def.DTypes).BOOL,
    [
        (0, $1AwR2$win32def.DTypes).HWND,
        (0, $1AwR2$win32def.DTypes).RECT
    ]
];
(0, $1AwR2$zeddwin32api.U).apiDef["ClientToScreen"] = [
    (0, $1AwR2$win32def.DTypes).BOOL,
    [
        (0, $1AwR2$win32def.DTypes).HWND,
        (0, $1AwR2$win32def.DTypes).LPPOINT
    ]
];
const $03112ec43cdf56af$var$user32 = (0, $1AwR2$zeddwin32api.U).load();
const $03112ec43cdf56af$var$Struct = (0, ($parcel$interopDefault($1AwR2$refstructdi)))($1AwR2$refnapi);
let $03112ec43cdf56af$var$igtState = $03112ec43cdf56af$export$1fbf6ae150f5289f.UNKNOWN;
let $03112ec43cdf56af$var$hwnd = 0;
let $03112ec43cdf56af$var$tickTime = 500;
let $03112ec43cdf56af$var$timer;
let $03112ec43cdf56af$var$callback = (state)=>{};
$03112ec43cdf56af$var$user32.SetProcessDPIAware();
const $03112ec43cdf56af$export$5801d716674e6bb6 = (igtCallback)=>{
    $03112ec43cdf56af$var$callback = igtCallback;
};
const $03112ec43cdf56af$export$a679630bf91eb455 = ()=>{
    $03112ec43cdf56af$var$igtState = $03112ec43cdf56af$export$1fbf6ae150f5289f.UNKNOWN;
    $03112ec43cdf56af$var$hwnd = 0;
    $03112ec43cdf56af$var$timer = setTimeout($03112ec43cdf56af$var$tickProcessIgt, $03112ec43cdf56af$var$tickTime);
};
const $03112ec43cdf56af$export$cb0b9fb431e2932b = ()=>{
    clearInterval($03112ec43cdf56af$var$timer);
};
const $03112ec43cdf56af$var$runCallbackIfChanged = (state)=>{
    if (state != $03112ec43cdf56af$var$igtState) {
        $03112ec43cdf56af$var$igtState = state;
        $03112ec43cdf56af$var$callback($03112ec43cdf56af$var$igtState);
    }
};
const $03112ec43cdf56af$var$tickProcessIgt = ()=>{
    $03112ec43cdf56af$var$timer = setTimeout(()=>{
        $03112ec43cdf56af$var$processIgt();
        $03112ec43cdf56af$var$tickProcessIgt();
    }, $03112ec43cdf56af$var$tickTime);
};
const $03112ec43cdf56af$var$enumWindowsProc = $1AwR2$ffinapi.Callback((0, $1AwR2$win32def.DTypes).BOOL, [
    (0, $1AwR2$win32def.DTypes).HWND,
    (0, $1AwR2$win32def.DTypes).LPARAM
], (window, lParam)=>{
    const buf = $03112ec43cdf56af$require$Buffer.alloc(254);
    $03112ec43cdf56af$var$user32.GetWindowTextW(window, buf, buf.byteLength);
    if (buf.toString("ucs2").replace(/\0+$/, "") == "Diablo II: Resurrected") {
        $03112ec43cdf56af$var$hwnd = window;
        return false;
    }
    return true;
});
const $03112ec43cdf56af$var$noGame = ()=>{
    $03112ec43cdf56af$var$runCallbackIfChanged($03112ec43cdf56af$export$1fbf6ae150f5289f.NO_GAME);
    $03112ec43cdf56af$var$hwnd = 0;
    $03112ec43cdf56af$var$tickTime = 500;
};
const $03112ec43cdf56af$var$gameLoading = ()=>{
    $03112ec43cdf56af$var$runCallbackIfChanged($03112ec43cdf56af$export$1fbf6ae150f5289f.LOADING);
    $03112ec43cdf56af$var$tickTime = 10;
};
const $03112ec43cdf56af$var$gamePlaying = ()=>{
    $03112ec43cdf56af$var$runCallbackIfChanged($03112ec43cdf56af$export$1fbf6ae150f5289f.PLAYING);
    $03112ec43cdf56af$var$tickTime = 10;
};
const $03112ec43cdf56af$var$processIgt = ()=>{
    if ($03112ec43cdf56af$var$hwnd === 0) {
        $03112ec43cdf56af$var$user32.EnumWindows($03112ec43cdf56af$var$enumWindowsProc, 0);
        if ($03112ec43cdf56af$var$hwnd === 0) {
            $03112ec43cdf56af$var$noGame();
            return;
        }
    }
    /** @ts-ignore */ const origin = new $03112ec43cdf56af$var$Struct((0, $1AwR2$win32def.DStruct).POINT)();
    const retw = $03112ec43cdf56af$var$user32.ClientToScreen($03112ec43cdf56af$var$hwnd, origin.ref());
    if (retw == 0) {
        $03112ec43cdf56af$var$noGame();
        return;
    }
    /** @ts-ignore */ const rectClient = new $03112ec43cdf56af$var$Struct((0, $1AwR2$win32def.DStruct).RECT)();
    const ret = $03112ec43cdf56af$var$user32.GetClientRect($03112ec43cdf56af$var$hwnd, rectClient.ref());
    if (ret == 0) {
        $03112ec43cdf56af$var$noGame();
        return;
    }
    const w = rectClient.right;
    const h = rectClient.bottom;
    const x = origin.x;
    const y = origin.y;
    const screenshot = (0, $1AwR2$windowsffi.CaptureScreenshot)({
        rectToCapture: new (0, $1AwR2$windowsffi.VRect)(x + Math.round(w / 2) - 100, y + h - 1, 200, 1)
    });
    const isLoading = screenshot.GetPixel(0, 0).ToHex_RGB() == "000000" && screenshot.GetPixel(100, 0).ToHex_RGB() == "000000" && screenshot.GetPixel(199, 0).ToHex_RGB() == "000000";
    if (isLoading) $03112ec43cdf56af$var$gameLoading();
    else $03112ec43cdf56af$var$gamePlaying();
};


//# sourceMappingURL=igt.cjs.map

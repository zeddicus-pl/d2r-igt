import { U } from 'zedd-win32-api';
import StructDi from 'ref-struct-di';
import * as ffi from 'ffi-napi';
import * as ref from 'ref-napi';
import { DModel as M, DStruct as DS, DTypes as W } from 'win32-def';
import { VRect, CaptureScreenshot } from "windows-ffi";

export enum IgtState {
  UNKNOWN,
  NO_GAME,
  PLAYING,
  LOADING
}

U.apiDef['SetProcessDPIAware'] = [W.BOOL, []];
U.apiDef['GetClientRect'] = [W.BOOL, [W.HWND, W.RECT]];
U.apiDef['ClientToScreen'] = [W.BOOL, [W.HWND, W.LPPOINT]];
const user32 = U.load();
const Struct = StructDi(ref);

let igtState = IgtState.UNKNOWN;
let hwnd: M.HWND = 0;
let tickTime = 500;
let timer: NodeJS.Timer;

type IgtCallback = (state: IgtState) => void;
let callback: IgtCallback = (state) => {};

user32.SetProcessDPIAware();

export const setIgtCallback = (igtCallback: IgtCallback) => {
  callback = igtCallback;
}

export const startIgt = () => {
  igtState = IgtState.UNKNOWN;
  hwnd = 0;
  timer = setTimeout(tickProcessIgt, tickTime)
}

export const stopIgt = () => {
  clearInterval(timer);
}

const runCallbackIfChanged = (state: IgtState) => {
  if (state != igtState) {
    igtState = state;
    callback(igtState);
  }
}

const tickProcessIgt = () => {
  timer = setTimeout(() => {
    processIgt();
    tickProcessIgt();
  }, tickTime);
}

const enumWindowsProc = ffi.Callback(
  W.BOOL,
  [W.HWND, W.LPARAM],
  (window: M.HWND, lParam: M.LPARAM): M.BOOLEAN => {
    const buf = Buffer.alloc(254)
    user32.GetWindowTextW(window, buf, buf.byteLength);
    if (buf.toString('ucs2').replace(/\0+$/, '') == "Diablo II: Resurrected") {
      hwnd = window;
      return false;
    }
    return true;
  },
)

const noGame = () => {
  runCallbackIfChanged(IgtState.NO_GAME);
  hwnd = 0;
  tickTime = 500;
}

const gameLoading = () => {
  runCallbackIfChanged(IgtState.LOADING);
  tickTime = 10;
}

const gamePlaying = () => {
  runCallbackIfChanged(IgtState.PLAYING);
  tickTime = 10;
}

const processIgt = () => {
  if (hwnd === 0) {
    user32.EnumWindows(enumWindowsProc, 0);
    if (hwnd === 0) {
      noGame();
      return;
    }
  }

  /** @ts-ignore */
  const origin: M.POINT_Struct = new Struct(DS.POINT)();
  const retw = user32.ClientToScreen(hwnd, origin.ref())
  if (retw == 0) {
    noGame();
    return;
  }
  
  /** @ts-ignore */
  const rectClient: M.RECT_Struct = new Struct(DS.RECT)();
  const ret = user32.GetClientRect(hwnd, rectClient.ref())
  if (ret == 0) {
    noGame();
    return;
  }

  const w = rectClient.right;
  const h = rectClient.bottom;
  const x = origin.x;
  const y = origin.y;

  const screenshot = CaptureScreenshot({
    rectToCapture: new VRect(x + Math.round(w / 2) - 100, y + h - 1, 200, 1),
  });

  const isLoading = screenshot.GetPixel(0, 0).ToHex_RGB() == '000000' &&
    screenshot.GetPixel(100, 0).ToHex_RGB() == '000000' &&
    screenshot.GetPixel(199, 0).ToHex_RGB() == '000000';

  if (isLoading) {
    gameLoading();
  } else {
    gamePlaying();
  }
};

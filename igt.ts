import StructDi from 'ref-struct-di';
import * as ffi from 'ffi-napi';
import * as ref from 'ref-napi';
import { DModel as M, DStruct as DS, DTypes as W } from 'win32-def';

export enum IgtState {
  UNKNOWN,
  NO_GAME,
  PLAYING,
  LOADING
}

const Struct = StructDi(ref);

const BitmapStruct = Struct({
  bmType: ffi.types.long,
  bmWidth: ffi.types.long,
  bmHeight: ffi.types.long,
  bmWidthBytes: ffi.types.long,
  bmPlanes: ffi.types.uint16,
  bmBitsPixel: ffi.types.uint16,
  bmBits: "ulonglong",
});

export const BitmapInfoHeaderStruct = Struct({
  biSize: ffi.types.uint32,
  biWidth: ffi.types.int32,
  biHeight: ffi.types.int32,
  biPlanes: ffi.types.ushort,
  biBitCount: ffi.types.ushort,
  biCompression: ffi.types.uint32,
  biSizeImage: ffi.types.uint32,
  biXPelsPerMeter: ffi.types.int32,
  biYPelsPerMeter: ffi.types.int32,
  biClrUsed: ffi.types.uint32,
  biClrImportant: ffi.types.uint32,
});
export const ColorRefStruct = Struct({
  red: ffi.types.byte,
  green: ffi.types.byte,
  blue: ffi.types.byte,
  alpha: ffi.types.byte,
});

const user32 = ffi.Library("user32", {
  SetProcessDPIAware: [W.BOOL, []],
  GetClientRect: [W.BOOL, [W.HWND, W.RECT]],
  ClientToScreen: [W.BOOL, [W.HWND, W.LPPOINT]],
  GetWindowTextW: [W.INT, [W.HWND, W.LPTSTR, W.INT]],
  EnumWindows: [W.BOOL, [W.WNDENUMPROC, W.LPARAM]],
  GetDC: [W.HWND, [W.HWND]],
  ReleaseDC: [W.ULONG, [W.HWND, W.HDC]],
});

const kernel32 = ffi.Library("kernel32", {
  GlobalUnlock: [W.BOOL, [W.INT32]],
  GlobalFree: [W.INT32, [W.INT32]],
});

const gdi32 = ffi.Library("GDI32", {
  SelectObject: [W.HGDIOBJ, [ W.HDC, W.HGDIOBJ ]],
  CreateCompatibleDC: [W.HDC, [W.HDC]],
  CreateCompatibleBitmap: [W.HBITMAP, [W.HDC, W.INT, W.INT]],
  BitBlt: [W.BOOL, [W.HDC, W.INT, W.INT, W.INT, W.INT, W.HDC, W.INT, W.INT, W.DWORD]],
  GetObjectA: [W.INT, [W.HANDLE, W.INT, W.LPVOID]],
  DeleteObject: [W.BOOL, [ W.HWND ]],
  GetDIBits: [W.INT32, [W.HWND, W.HWND, W.UINT32, W.UINT32, ref.refType(BitmapStruct), ref.refType(BitmapInfoHeaderStruct), W.INT32]],
});

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
    /** @ts-ignore */
    user32.EnumWindows(enumWindowsProc, 0);
    if (hwnd === 0) {
      noGame();
      return;
    }
  }

  /** @ts-ignore */
  const origin: M.POINT_Struct = new Struct(DS.POINT)();
  /** @ts-ignore */
  const retw = user32.ClientToScreen(hwnd, origin.ref())
  if (retw == 0) {
    noGame();
    return;
  }
  
  /** @ts-ignore */
  const rectClient: M.RECT_Struct = new Struct(DS.RECT)();
  /** @ts-ignore */
  const ret = user32.GetClientRect(hwnd, rectClient.ref())
  if (ret == 0) {
    noGame();
    return;
  }

  const w = rectClient.right;
  const h = rectClient.bottom;
  const x = origin.x;
  const y = origin.y;

  const screenshot = CaptureScreenshot(x + Math.round(w / 2) - 100, y + h - 1, 200, 1);

  const isLoading = screenshot[0] === 0 && screenshot[1] === 0 && screenshot[2] === 0 &&
  screenshot[400] === 0 && screenshot[401] === 0 && screenshot[402] === 0 &&
  screenshot[796] === 0 && screenshot[797] === 0 && screenshot[798] === 0;

  if (isLoading) {
    gameLoading();
  } else {
    gamePlaying();
  }
};

export function CaptureScreenshot(x: number, y:number, width:number, height: number): Buffer {
  var _a;
  let hdcWindow = null;
  let hdcMemDC = null;
  let hbmScreen = null;
  let hDIB = null;
  try {
      hdcWindow = user32.GetDC(0);
      hdcMemDC = gdi32.CreateCompatibleDC(hdcWindow);
      hbmScreen = gdi32.CreateCompatibleBitmap(hdcWindow, width, height);
      gdi32.SelectObject(hdcMemDC, hbmScreen);
      gdi32.BitBlt(hdcMemDC, 0, 0, width, height, hdcWindow, x, y, 0xCC0020);
      const bmpScreen = new BitmapStruct();
      gdi32.GetObjectA(hbmScreen, 32, bmpScreen.ref());
      const bi = new BitmapInfoHeaderStruct();
      bi.biSize = BitmapInfoHeaderStruct.size;
      const bmWidth = Number(bmpScreen.bmWidth);
      const bmHeight = Number(bmpScreen.bmHeight);
      bi.biWidth = bmWidth;
      bi.biHeight = -bmpScreen.bmHeight;
      bi.biPlanes = 1;
      bi.biBitCount = 32;
      bi.biCompression = 0;
      bi.biSizeImage = 0;
      bi.biXPelsPerMeter = 0;
      bi.biYPelsPerMeter = 0;
      bi.biClrUsed = 0;
      bi.biClrImportant = 0;
      const bitsPerRow = ((bmWidth * bi.biBitCount + 31) / 32) * 4;
      const dwBmpSize = bitsPerRow * bmHeight;
      const lpBitmap = Buffer.alloc(dwBmpSize);
      /** @ts-ignore */
      gdi32.GetDIBits(hdcWindow, hbmScreen, 0, bmHeight, lpBitmap, bi.ref(), 0);
      if (hDIB != null) {
          kernel32.GlobalUnlock(hDIB);
          kernel32.GlobalFree(hDIB);
      }
      if (hbmScreen != null) {
          gdi32.DeleteObject(hbmScreen);
      }
      if (hdcMemDC != null) {
          gdi32.DeleteObject(hdcMemDC);
      }
      if (hdcWindow != null) {
          /** @ts-ignore */
          user32.ReleaseDC(hwnd, hdcWindow);
      }
      return lpBitmap;
  }
  catch (err) {
      if (hDIB != null) {
          kernel32.GlobalUnlock(hDIB);
          kernel32.GlobalFree(hDIB);
      }
      if (hbmScreen != null)
          gdi32.DeleteObject(hbmScreen);
      if (hdcMemDC != null)
          gdi32.DeleteObject(hdcMemDC);
      if (hdcWindow != null)
          user32.ReleaseDC(hwnd, hdcWindow);
      throw err;
  }
}
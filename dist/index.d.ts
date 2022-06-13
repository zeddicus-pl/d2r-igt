export enum IgtState {
    UNKNOWN = 0,
    NO_GAME = 1,
    PLAYING = 2,
    LOADING = 3
}
type IgtCallback = (state: IgtState) => void;
export const setIgtCallback: (igtCallback: IgtCallback) => void;
export const startIgt: () => void;
export const stopIgt: () => void;

//# sourceMappingURL=index.d.ts.map

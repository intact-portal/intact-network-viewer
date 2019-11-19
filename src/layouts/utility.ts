import { Global } from './../global';
import { Constants } from './constants';

export class Utility {

  public setInitialMaxZoomLevel(): void {
    Global.graphcy.maxZoom(Constants.INITIAL_MAX_ZOOM);
  }

  public setUserMaxZoomLevel(): void {
    Global.graphcy.maxZoom(Constants.USER_MAX_ZOOM);
  }

  public setUserMinZoomLevel(): void {
    if (Global.graphcy.zoom() < 0.2) {
      Global.graphcy.minZoom(Global.graphcy.zoom());
    } else {
      Global.graphcy.minZoom(Constants.USER_MIN_ZOOM);
    }
  }

  public setInitialMinZoomLevel(): void {
    Global.graphcy.minZoom(Constants.INITIAL_MIN_ZOOM);
  }

  public setHighlightAndFocusMaxZoomLevel(): void {
    Global.graphcy.maxZoom(Constants.HIGHLIGHT_AND_FOCUS_MAX_ZOOM);
  }
}

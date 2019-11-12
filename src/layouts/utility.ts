import { Constants } from './constants';

export class Utility {

    private cy: any;

    constructor(cy:any) {
        this.cy = cy;
    }

    public setInitialMaxZoomLevel(): void{
        this.cy.maxZoom(Constants.INITIAL_MAX_ZOOM);
    }

    public setUserMaxZoomLevel(): void{
        this.cy.maxZoom(Constants.USER_MAX_ZOOM);
    }

    public setUserMinZoomLevel(): void{
        if(this.cy.zoom()<0.2){
            this.cy.minZoom(this.cy.zoom());
        }else {
            this.cy.minZoom(Constants.USER_MIN_ZOOM);
        }
    }

    public setInitialMinZoomLevel(): void{
        this.cy.minZoom(Constants.INITIAL_MIN_ZOOM);
    }

    public setHighlightAndFocusMaxZoomLevel(): void{
        this.cy.maxZoom(Constants.HIGHLIGHT_AND_FOCUS_MAX_ZOOM);
    }
}
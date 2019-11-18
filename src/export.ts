import { Global } from "./global";
export class Export {

 public static GRAPHML_FILENAME:string = 'network.graphml';
 public static PNG_FILENAME:string='network.png';
 public static PNG_BACKGROUND_COLOR:string='rgb(255,255,255)';

  constructor() {

  }

  public exportAsGraphml(): void {
    console.log(Global.graphcy.graphml());
    let element = document.createElement('a');
    let filename=Export.GRAPHML_FILENAME;
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(Global.graphcy.graphml()));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

    public exportAsPng(): void {
        var text = Global.graphcy.png({'output': 'blob','bg':Export.PNG_BACKGROUND_COLOR});
        var filename = Export.PNG_FILENAME;
        var type = "image/png";
        let element = document.createElement('a');
        var file = new Blob([text], { type: type });
        element.setAttribute('href', URL.createObjectURL(file));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    public exportAsSvg(): void {
        //TODO... When cytoscape releases support for SVG.
    }
}

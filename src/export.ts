import { Global } from "./global";
export class Export {

  constructor() {

  }

  public exportAsGraphml(): void {
    console.log(Global.graphcy.graphml());
    let element = document.createElement('a');
    let filename="network.graphml";
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(Global.graphcy.graphml()));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

    public exportAsPng(): void {
        var text = Global.graphcy.png({'output': 'blob','bg':'#ffffff'});
        var filename = "network.png";
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

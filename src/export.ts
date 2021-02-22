import { Global } from './global';

export class Export {
  public static GRAPHML_FILENAME: string = 'network.graphml';
  public static PNG_FILENAME: string = 'network.png';
  public static PNG_BACKGROUND_COLOR: string = 'rgb(255,255,255)';

  public exportAsGraphml(): void {
    const element = document.createElement('a');
    const filename = Export.GRAPHML_FILENAME;
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(Global.graphcy.graphml()));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  public exportAsPng(): void {
    const text = Global.graphcy.png({ output: 'blob', bg: Export.PNG_BACKGROUND_COLOR });
    const filename = Export.PNG_FILENAME;
    const imageType = 'image/png';
    const element = document.createElement('a');
    const file = new Blob([text], { type: imageType });
    element.setAttribute('href', URL.createObjectURL(file));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  public exportAsSvg(): void {
    // TODO... When cytoscape releases support for SVG.
  }
}

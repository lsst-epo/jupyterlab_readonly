import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';

import {
  Widget
} from '@phosphor/widgets';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

/**
 * Initialization data for the jupyterlab_readonly extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_readonly',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
  console.log('JupyterLab extension Read Only is activated!');
  console.log('ICommandPalette:', palette);
      
    // Create a single widget
    let widget: Widget = new Widget();
    widget.id = 'readonly-jupyterlab';
    widget.title.closable = true;
      

  
    // Add an application command
    const command: string = 'jupyter:readonly';
    app.commands.addCommand(command, {
        label: 'Read Only Notebook',
        execute: () => {
          app.commands.execute('notebook:run-all-cells');
          console.log('Success!'); 
          var style = document.createElement("style");
          document.head.appendChild(style);
          document.onkeydown = null;
          style.insertAdjacentHTML('beforebegin',
        `<style>
          .jp-Cell {
            pointer-events:none;
            cursor: default;
          }
        </style>`
        );

        }
      });
      // Add the command to the palette.
      palette.addItem({command, category: 'Extensions'});
    }  
};

export default extension;

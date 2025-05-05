import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  saveComponentState: (data: any) => ipcRenderer.invoke('save-component-state', data)
});
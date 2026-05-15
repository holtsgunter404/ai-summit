import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // Add IPC methods here if needed later
});

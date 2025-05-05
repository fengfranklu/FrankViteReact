import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // In development, use the Vite dev server
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle saving component state
ipcMain.handle('save-component-state', async (_event, data) => {
  const filePath = path.join(__dirname, '../src/data/componentGroups.ts');
  const content = `
export interface ComponentInfo {
  id: string;
  name: string;
  path: string;
  description: string;
  groupId: string | null;
}

export interface ComponentGroup {
  id: string;
  name: string;
}

export const initialComponents: ComponentInfo[] = ${JSON.stringify(data.components, null, 2)};

export const initialGroups: ComponentGroup[] = ${JSON.stringify(data.groups, null, 2)};
`;

  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error saving component state:', error);
    return { success: false, error: error.message };
  }
});
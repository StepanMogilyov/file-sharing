const { Menu, BrowserWindow, Tray, ipcMain, app } = require("electron");
const isDev = require("electron-is-dev");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const configPath = path.join(app.getPath("userData"), "config.json");

const template = [
  {
    label: "View",
    submenu: [{ label: "Reload", role: "reload" }],
  },
];

const openedWindows = {};
const windows = { main: null, addSyncFolder: null };

const foldersToCheckSync = {};

let tray;

function createWindow() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  windows.main = new BrowserWindow({ width: 900, height: 680, webPreferences: { webSecurity: false, nodeIntegration: true, contextIsolation: false } });

  if (process.env.IS_DEV) windows.main.webContents.openDevTools();

  windows.main.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
  windows.main.on("closed", () => (windows.main = null));
}

app.on("ready", async () => {
  // const data = await fs.promises.readFile(path.join(__dirname, "../public/user-config.json"), "utf8");
  // const jsonData = JSON.parse(data);

  createWindow();

  tray = new Tray(path.join(__dirname, "../public/logo.jpg"));

  tray.on("click", () => {
    windows.main.show();
  });

  const contextMenu = Menu.buildFromTemplate([
    { label: "Open", click: () => windows.main.show() },
    { label: "Exit", click: () => app.quit() },
  ]);

  tray.setToolTip("My Electron App");
  tray.setContextMenu(contextMenu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (windows.main === null) createWindow();
});

ipcMain.on("addSyncFolder", (e) => {
  windows.addSyncFolder = new BrowserWindow({ width: 600, height: 600, parent: windows.main, show: false });

  if (!openedWindows.addSyncFolder) {
    openedWindows.addSyncFolder = true;
    windows.addSyncFolder.show();
  }

  windows.addSyncFolder.on("close", () => {
    delete openedWindows.addSyncFolder;
    windows.addSyncFolder = null;
  });
});

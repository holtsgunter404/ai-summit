# AI Summit Build Instructions

This project is configured to be built and packaged for Windows using `electron-builder`.

## Prerequisites

- Node.js (version 16 or higher recommended)
- Windows OS (to build the `.exe` and `.msi` installers)

## Build Steps

To package the application, run the following command in the root of the project:

```bash
npm run dist
```

## Output

The packaged application files will be located in the `release/` directory:

- `AI Summit Setup 2.0.4.exe`: The NSIS installer.
- `AI Summit 2.0.4.exe`: The portable version of the application.
- `win-unpacked/`: The unpacked application directory.

## Configuration Details

The build configuration is managed in the `build` section of `package.json`. It handles:
- Bundling the Vite production build (`dist/`).
- Including the Electron main process files (`electron/`).
- Setting the application metadata (`appId`, `productName`).
- Configuring Windows-specific targets (NSIS, Portable).

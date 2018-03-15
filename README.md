```
git clone https://github.com/countravioli/electron-native-image-resize-transparency-bug
cd electron-native-image-resize-transparency-bug
npm install
npm start
npm run start-works
```

*npm start* - will run the app normally, illustrating the bug. Two images are written in the directory at the same level as app.js (original.png and resized.png)

*npm run start* -works - will run the app with disableHardwareAcceleration showing things work. The same to pngs are created.

The app will quit when its done. If you are on mac the pngs will open in your default application associated with the file type. 



# Copied from Electron Issue I'm creating

* Electron version: 2.0.0beta3 & 1.8.3
* Operating system: OSX & Windows 10 64bit

### Expected behavior

resizing a nativeImage that is a product of calling BrowserWindow.capturePage should maintain transparency in all cases, not just when hardware acceleration is disabled

### Actual behavior
resizing a nativeImage that is a product of calling BrowserWindow.capturePage converts tranparent pixels to black. If you instantiate your app disabling the gpu / hardware acceleration (app.disableHardwareAcceleration) it works as one would expect.

### Additional
I am calling capturePage on a BrowserWindow instance that has transparency. I expect this image to be a certain size, but because of some higher DPI monitors it has to be resized in certain instances. Then I call nativeImage.resize({ width, height }) with the correct width and height (say half of what it captured when I am on a display of scaleFactor 2. Calling resize here the image seems to loose transparency and transparent pixels are converted to black.

If I call .toPNG() and write that buffer to disk before the resize it looks right.
If I call resize(...).toPNG() and write that to disk I have the black background.

Workaround is to call app.disableHardwareAcceleration but that seems like a weird work around in this case and would like to be avoided.



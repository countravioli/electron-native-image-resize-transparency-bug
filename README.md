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



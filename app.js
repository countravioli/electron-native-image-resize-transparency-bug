const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');

const { app, BrowserWindow } = require('electron');

// When disabling the GPU, resizing will preserve transparency
if (process.argv.indexOf('--disableGPU') >= 0) {
	app.disableHardwareAcceleration();
}

const htmlPath = path.join(__dirname, 'test.html');
const width = 800;
const height = 600;

app.on('ready', () => {
	const win = new BrowserWindow({
		width,
		height,
		show : false,
		transparent : true,
	});
	win.loadURL(`file://${htmlPath}`);
	win.once('ready-to-show', () => {
		// seeing the window is irrelevant, works the same when its not visible to the user
		win.show();

		win.capturePage({
			x : 0,
			y : 0,
			width,
			height,
		}, (nativeImage) => {
			// Convert the nativeImage to PNG buffers
			const original = nativeImage.toPNG();
			const resized = nativeImage.resize({
				width : width / 2,
				height : height / 2,
			}).toPNG();

			// Write to disk
			const originalPath = path.join(__dirname, 'original.png');
			const resizedPath = path.join(__dirname, 'resized.png');
			fs.writeFileSync(originalPath, original);
			fs.writeFileSync(resizedPath, resized);

			// If you are on a mac, just open them up
			if (os.platform() === 'darwin') {
				execSync(`open ${originalPath}`);
				execSync(`open ${resizedPath}`);
			}

			console.log('done writing images');
			setTimeout(app.quit, 500);
		});
	});
});

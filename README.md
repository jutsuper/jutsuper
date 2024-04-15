[<img src="assets/flag/ru.svg" alt="RU Flag" width="20"/> Русский](https://github.com/kerdl/jutsuper/blob/main/README-RU.md)

# This extension is in active development
The basic functionality works,
but there are still some things 
needed to be done.

If you want to use it right now:
1. Build the thing (instructions below)
2. Install the unpacked version (instructions below)
3. Enable autoplay in your browser ("Sound" in Chromium browsers).
Go to site settings and enable it for **jut.su**.

Settings are changed directly in the player.
Open up any anime and look for the
<picture><img src="src/assets/logo/square-green-48.svg" width="12" /></picture> 
icon in the controls bar.

Settings may have confusing names. 
Hover over its name to get a better description.

Ads are not and won't be skipped, 
because different ad providers use 
diffrent layouts. Use ad-blocking 
extensions, if that's a problem.

# <picture><img src="src/assets/logo/square-green-48.svg" width="25" /></picture> Autoskip browser plugin for [jut.su](https://jut.su/)

### Skip openings and endings, play automatically
<picture>
  <p align="left">
    <img
      src="assets/showcase/autoskip-element.svg"
      width="500px"
      alt="Opening and ending skip with autoplay animation"
    />
  </p>
</picture>

### Persist fullscreen
<picture>
  <p align="left">
    <img
      src="assets/showcase/persistent-fullscreen-element.svg"
      width="500px"
      alt="Persistent fullscreen animation"
    />
  </p>
</picture>

### Change preferences
<picture>
  <p align="left">
    <img
      src="assets/showcase/change-preferences-element.svg"
      width="500px"
      alt="Changing preferences animation"
    />
  </p>
</picture>

# Building
1. Install [Node.js](https://nodejs.org/en/download)
2. Clone this repository
```bash
git clone https://github.com/jutsuper/jutsuper
```
4. CD into it
```bash
cd jutsuper
```
5. Install dependencies
```bash
npm install
```
7. Build
```bash
npm run build
```

# Temporary install
## Blink browsers (Chromium)
- **Google Chrome**
- **Microsoft Edge**
- **Opera**
- **Yandex Browser**
- etc.

1. Open up `chrome://extensions` in your browser
2. Enable developer mode at the top right
3. Click on `Load unpacked`
4. Navigate to the cloned repository
5. Select `./dist/blink` folder

## Gecko browsers
- **Firefox**

1. Open up `about:debugging` in your browser
2. Click `This Firefox` on the left
3. Click `Load Temporary Add-on...`
4. Navigate to the cloned repository
5. Select `./dist/gecko/manifest.json`

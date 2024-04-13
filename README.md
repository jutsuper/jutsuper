[<img src="assets/flag/ru.svg" alt="RU Flag" width="20"/> Русский](https://github.com/kerdl/jutsuper/blob/main/README-RU.md)


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
```git clone https://github.com/jutsuper/jutsuper```bash
3. CD into it
```cd jutsuper```bash
4. Install dependencies
```npm install```bash
5. Build
```npm run build```bash

# Testing
## Blink browsers
- Google Chrome
- Opera
- Yandex Browser
- etc.

1. Open up `chrome://extensions` in your browser
2. Enable developer mode at the top left
3. Click on `Load unpacked`
4. Navigate to the cloned repository
5. Select `./dist/blink` folder

## Gecko browsers
- Firefox

1. Open up `about:debugging` in your browser
2. Click `This Firefox` on the left
3. Click `Load temporary Add-on...`
4. Navigate to the cloned repository
5. Select `./dist/gecko/manifest.json`

[<img src="assets/flag/gb.svg" alt="GB Flag" width="20"/> English](README.md)


# <picture><img src="src/assets/logo/square-green-48.svg" width="25" /></picture> Браузерный плагин автопропуска на [jut.su](https://jut.su/)


### Пропускай опенинги и эндинги, воспроизводи автоматически
<picture>
  <p align="left">
    <img
      src="assets/showcase/automatically-skip.svg"
      width="500px"
      alt="Анимация пропуска опенингов и эндингов с автоматическим воспроизведением"
    />
  </p>
</picture>

### Сохраняй полноэкранный режим
<picture>
  <p align="left">
    <img
      src="assets/showcase/persistent-fullscreen.svg"
      width="500px"
      alt="Анимация сохранения полноэкранного режима"
    />
  </p>
</picture>

### Настраивай
<picture>
  <p align="left">
    <img
      src="assets/showcase/change-preferences.svg"
      width="500px"
      alt="Анимация настройки"
    />
  </p>
</picture>

# Сборка
1. Установи [Node.js](https://nodejs.org/en/download)
2. Склонируй репозиторий
```bash
git clone https://github.com/jutsuper/jutsuper
```
4. Перейди в директорию
```bash
cd jutsuper
```
5. Установи зависимости
```bash
npm install
```
7. Собери
```bash
npm run build
```

# Временная установка
## Браузеры Blink (Chromium)
- **Google Chrome**
- **Microsoft Edge**
- **Opera**
- **Yandex Browser**
- и т.д.

1. Открой `chrome://extensions` в браузере
2. Включи режим разработчика в верхнем правом углу
3. Нажми на `Загрузить распакованное`
4. Открой папку с репозиторием
5. Выбери папку `./dist/blink`

## Браузеры Gecko
- **Firefox**

1. Открой `about:debugging` в браузере
2. Нажми `Этот Firefox` справа
3. Нажми `Загрузить временное дополнение...`
4. Открой папку с репозиторием
5. Выбери файл `./dist/gecko/manifest.json`

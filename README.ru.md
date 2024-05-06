[<img src="assets/flag/gb.svg" alt="GB Flag" width="20"/> English](README.md)

# Это расширение в активной разработке
Базовый функционал работает,
но всё ещё есть пара вещей, требующих доработки.

Если хочется использовать прямо сейчас:
1. Собери эту штуку (инструкции ниже)
2. Установи распакованную версию (инструкции ниже)
3. Включи автоматическое воспроизведение в браузере ("Звук" в браузерах Chromium).
Зайди в настройки сайтов и включи эту опцию для **jut.su**.

Настройки изменяются прямо в плеере.
Открой любое аниме и ищи иконку
<picture><img src="src/assets/logo/square-green-48.svg" width="12" /></picture>
в нижней панели.

У опций могут быть непонятные названия.
Наведись на неё, чтобы получить описание.

Реклама не пропускается,
и в планах реализовывать такое нет,
потому что разные рекламодатели используют
разную компоновку плеера.
Используй адблокеры, если это проблема.

# <picture><img src="src/assets/logo/square-green-48.svg" width="25" /></picture> Браузерный плагин автопропуска на [jut.su](https://jut.su/)


### Пропускай опенинги и эндинги, воспроизводи автоматически
<picture>
  <p align="left">
    <img
      src="assets/showcase/autoskip-element.svg"
      width="500px"
      alt="Анимация пропуска опенингов и эндингов с автоматическим воспроизведением"
    />
  </p>
</picture>

### Сохраняй полноэкранный режим
<picture>
  <p align="left">
    <img
      src="assets/showcase/persistent-fullscreen-element.svg"
      width="500px"
      alt="Анимация сохранения полноэкранного режима"
    />
  </p>
</picture>

### Настраивай
<picture>
  <p align="left">
    <img
      src="assets/showcase/change-preferences-element.svg"
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

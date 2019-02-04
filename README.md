
## Табло аэропорта Шереметьево

Проект представляет из себя онлайн-табло аэропорта Шереметьево.
Содержит следующие функции:
    - представление списка, упорядоченных по времени (в сторону увелечения), вылетающих рейсов,
    - представление списка, упорядоченных по времени (в сторону увелечения), прилетающих рейсов,
    - Live-фильтрация списков по номеру рейса,
    - Live-фильтрация списков по наличии задержки рейса.

## Структура проекта
```
    -table-air-2/
        -public/
            -favicon.ico
            -index.html
        -src/
            -components/
                -App/
                    -img/
                        -logo.png
                    -index.js
                    -style.css
                -Arrival/
                    -index.js
                    -ListArr_19_09_2018__06h.json
                -Departure/
                    -index.js
                    -ListDep_19_09_2018__06h.json
                -FlightList/
                    -index.js
                    -style.css
            -index.js
```

Информация о рейсах получается из файлов:

    ListArr_19_09_2018__06h.json -> информация о прилетающих рейсах
    ListDep_19_09_2018__06h.json -> информация о вылетающих рейсах

Данные JSON-файлов актуальны на 19 сентября 2018 года с 09:00 по 15:00 (по Мск).
Также реализована возможность получение информации по API.

## Получение информации по API

Информация о рейсах аэропорта получается с помощью API ресурса: [Flight Stats](https://developer.flightstats.com/)

Для работы с API необходимо зарегистрироваться на сайте и получить:
`
    -APPLICATION ID
    -APPLICATION KEY
`
Полученные ID и KEY необходимо зашить в 'FlightList\index.js' в пременные:
`
let appId = '';
let appKey = '';
`
(!!Обратите внимание, что бесплатное использование API длится 30 дней и расчитано на 1000 запросов!!)

Для обхода ошибки "Failed to execute 'send' on 'XMLHttpRequest'", для GoogleChrome необходим плагин:
    [Allow-Control-Allow-Origin](Failed to execute 'send' on 'XMLHttpRequest')

OFFLINE - режим (из JSON-файлов):
    в FlightList\index.js:
`
        /**...*/
        requestArr.onload = function() {
                    flightsArrFull=flightsInfoArr;
                };
        /**...*/
        requestDep.onload = function() {
                    flightsDepFull=flightsInfoDep;
                };
        /**...*/
`
ONLINE - режим (API):
    в FlightList\index.js:
`    
        /**...*/
        requestArr.onload = function() {
                    flightsArrFull = JSON.parse(requestArr.response);
                };
        flightsArrFull=JSON.parse(flightsInfoArr);
        /**...*/
        requestDep.onload = function() {
                    flightsDepFull=flightsInfoDep;
                };
        flightsArrFull=JSON.parse(flightsInfoArr);
        /**...*/
`

## Активация сервера

В директории программы необходимо запустить терминал и ввести `npm start`

Приложение запустится и будет доступно по адресу: [http://localhost:3000](http://localhost:3000).

Тестовое задание для KSG

В [.env.example](.env.example) можно найти все поля, необходимые для запуска. Создайте **.env** файл в корне.

Для работы проекта также потребуется **docker** с развернутыми **redis** и **postgres** инстансами.

При `SERVER_ENV=local` будут включены логи в консоли.

По умолчанию я поставил вычетание с баланса в 100 единиц.

Доступные роуты:
1. `/mock` - создаст одного пользователя в бд с балансом в 300
2. `/health` - самый простой health-check
3. `/prices` - получение списка предметов и их цены
4. `/buy` - эмулятор покупки предмета от пользователя (авторизации и прочих вещей не нужно)

Как запустить:
1. Поднять postgres + redis в docker
2. Прописать .env файл в корне
3. Запустить `/mock` роут для создания пользователя

Используемые библиотеки:
1. `assert` - валидация конфига
2. `dotenv` - добавление окружения
3. `fastify` - основной фреймворк
4. `fastify-plugin` - для удобной модуляции контроллеров
5. `ioredis` - использование redis
6. `pg` - простой конектор для raw-запросов
7. `shx` - копирование **.env** в **dist** (т.к писал на windows, использование обычного `copy` могло быть проблемой)

Stay safe! 👈(ﾟヮﾟ👈)
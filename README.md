
<br>  
<p align="center">  
<img src="./client-side/public/images/logos/logo-for-readme.svg" alt="Utome logo" width="270"/>
</p>  
<p align="center">  
Фуллстек-проект с тарифными планами, с интеграцией платежных систем <b>ЮKassa</b>, <b>Stripe</b> и <b>Crypto Pay</b>.  
</p>  

## Ключевые возможности

-   **Мультиплатежная система**: Интеграция с тремя популярными сервисами для приема платежей.
    
-   **JWT Аутентификация**: Безопасная система регистрации и входа на основе acess-refresh токенов.
    
-   **Рекуррентные платежи**: Реализован механизм подписок для регулярных списаний (Stripe & ЮKassa).
    
-   **Обработка вебхуков**: Надежная система для получения уведомлений от платежных систем и обновления статусов транзакций в реальном времени.
    
-   **Email-уведомления**: Автоматическая отправка писем пользователям о результатах платежей с использованием шаблонов на React Email.
    
-   **Фоновые задачи**: Использование очередей BullMQ для обработки отложенных и ресурсоемких операций, не блокируя основной поток приложения.
    
-   **API-документация**:  Документация API с помощью Swagger.
    

## Стек технологий

### **Backend (серверная часть)**

-   **Фреймворк**: [NestJS](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnestjs.com%2F) — прогрессивный Node.js фреймворк для построения эффективных и масштабируемых серверных приложений на TypeScript.
    
-   **База данных и ORM**: [PostgreSQL](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.postgresql.org%2F) с [Prisma](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.prisma.io%2F) для типобезопасного взаимодействия с базой данных.
    
-   **Аутентификация**: [Passport.js](https://www.google.com/url?sa=E&q=http%3A%2F%2Fwww.passportjs.org%2F) с реализацией **JWT-стратегии** для защиты эндпоинтов.
    
-   **Хеширование паролей**: [Argon2](https://www.google.com/url?sa=E&q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FArgon2) — современный и безопасный алгоритм хеширования.
    
-   **Платежи**: Интеграция с [ЮKassa](https://www.google.com/url?sa=E&q=https%3A%2F%2Fyookassa.ru%2F) (nestjs-yookassa), [Stripe](https://www.google.com/url?sa=E&q=https%3A%2F%2Fstripe.com%2F) (stripe) и [Crypto Pay](https://www.google.com/url?sa=E&q=https%3A%2F%2Fhelp.crypt.bot%2Fcrypto-pay-api) (через axios).
    
-   **Очереди и фоновые задачи**: [BullMQ](https://www.google.com/url?sa=E&q=https.bullmq.io) и [Redis](https://www.google.com/url?sa=E&q=https%3A%2F%2Fredis.io) для управления фоновыми задачами, такими как отправка писем.
    
-   **Отправка писем**: [NestJS Mailer](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnestjs-modules.github.io%2Fmailer) и [React Email](https://www.google.com/url?sa=E&q=https%3A%2F%2Freact.email) для создания и отправки транзакционных писем.
    
-   **Валидация**: class-validator и class-transformer для надежной валидации входящих данных (DTO).
    
-   **Окружение**: [Docker](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.docker.com%2F) для контейнеризации базы данных и Redis.
    

### **Frontend (клиентская часть)**

-   **Фреймворк**: [Next.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnextjs.org%2F) (с [Turbopack](https://www.google.com/url?sa=E&q=https%3A%2F%2Fturbo.build%2Fpack)) — React-фреймворк для создания высокопроизводительных веб-приложений с рендерингом на стороне сервера (SSR).
    
-   **Управление состоянием сервера**: [TanStack Query (React Query)](https://www.google.com/url?sa=E&q=https%3A%2F%2Ftanstack.com%2Fquery%2Flatest) для управления кэшированием, синхронизацией и обновлением серверных данных.
    
-   **Стилизация**: [Tailwind CSS](https://www.google.com/url?sa=E&q=https%3A%2F%2Ftailwindcss.com%2F) — utility-first CSS-фреймворк для быстрой и кастомной стилизации.
    
-   **UI-компоненты**: [Radix UI](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.radix-ui.com%2F) — библиотека низкоуровневых, доступных и кастомизируемых UI-компонентов.
    
-   **Формы**: [React Hook Form](https://www.google.com/url?sa=E&q=https%3A%2F%2Freact-hook-form.com%2F) с валидацией через [Zod](https://www.google.com/url?sa=E&q=https%3A%2F%2Fzod.dev%2F) для создания производительных и надежных форм.
    
-   **HTTP-клиент**: [Axios](https://www.google.com/url?sa=E&q=https%3A%2F%2Faxios-http.com%2F) для выполнения запросов к API.
    
-   **Генерация API-клиента**: [Orval](https://www.google.com/url?sa=E&q=https%3A%2F%2Forval.dev) для автоматической генерации типизированного клиента API на основе Swagger-схемы бэкенда.
    

## Скриншоты приложения

<details>  
<summary><strong>Аутентификация и главная страница</strong></summary>  
<p align="center">  
<a href="https://iimg.su/i/hKaqzA"><img src="https://s.iimg.su/s/08/ghKaqzAxQ2SA3LpIelpoK82E5X0fsfYm2WXnvE4A.png"></a>
<em>Форма входа</em>  
<br>  
<p align="center">  
<a href="https://iimg.su/i/mXj7ly"><img src="https://s.iimg.su/s/08/gmXj7lyxVKwtq75uMkF94A8M0OdzyNjIvpW7Ojj5.png"></a>
<em>Страница с выбором тарифных планов</em>
</p>    
</details>  

<details>  
<summary><strong>Процесс оплаты</strong></summary>  
<p align="center">  
<a href="https://iimg.su/i/AwmJWJ"><img src="https://s.iimg.su/s/08/gAwmJWJxIgZiqXTORC0OoR28nXhf7wHKuctMD9zX.png"></a>
<em>Страница выбора способа оплаты</em>  
<br>  
<p align="center">  
<a href="https://iimg.su/i/UGPrza"><img src="https://s.iimg.su/s/08/gUGPrzaxBL4t6wab4Ef69qoHUyqCGjmkqWinCpzN.png"></a>
<em>Страница успешной оплаты</em>
</p>    
</details>   

<details>  
<summary><strong>Личный кабинет пользователя</strong></summary>  
<p align="center">  
<a href="https://iimg.su/i/4buvEE"><img src="https://s.iimg.su/s/08/g4buvEExyO1lGNcGBj3ynooefw50vJz1EVcAizeQ.png"></a>
<em>История платежей</em>  
</p>    
</details>  

----------

## Установка и запуск

### **Предварительные требования**

-   **Node.js** (версия 20.x или выше)
    
-   **Docker** и **Docker Compose**
    
-   **Yarn**  и  **Bun**  в качестве менеджеров пакетов.
    

### **Шаг 1: Клонирование репозитория**

    git clone https://github.com/tramalretard/fullstack-payment-system-integration-service.git
    cd fullstack-payment-system-integration-service`
  

### **Шаг 2: Настройка бэкенда**

1. Перейдите в директорию серверной части.
```
cd server-side
```
2. Создайте файл .env на основе примера.
```
cp .env.example .env
```
3. Заполните переменные окружения в файле .env своими данными (ключи API платежных систем, данные для подключения к БД и Redis, JWT-секреты).
```
POSTGRES_USER="your_user"
JWT_SECRET="your_jwt_secret"
... и другие переменные
```
4. Запустите контейнеры с PostgreSQL и Redis с помощью Docker.
```
docker-compose up -d
```
    
5. Установите зависимости с помощью Yarn.
```
yarn install
``` 
    
6. Примените миграции базы данных для создания таблиц.
```
npx prisma migrate dev
``` 
      
7. Заполните базу данных тестовыми данными (тарифные планы).
```
yarn run db:seed
``` 
      
    

### **Шаг 3: Настройка фронтенда**

1. В **новом окне терминала** перейдите в директорию клиентской части.
```
cd client-side
```
    
2. Создайте файл .env на основе примера и укажите заполните  переменные окружения.
```
cp .env.example .env
```
3. Установите зависимости с помощью Bun.
```
bun install
```

### **Шаг 4: Запуск приложения**

1.  **Запустите бэкенд-сервер** (из директории server-side):
```
yarn start:dev
```      
   Сервер будет доступен по адресу http://localhost:4000.
    
2.  **Запустите фронтенд-приложение** (из директории client-side):
```
bun run dev
```      
    
 Приложение будет доступно по адресу http://localhost:3000.
    

## Документация API

После запуска бэкенда API-документация Swagger доступна по адресу:

[http://localhost:4000/docs](https://www.google.com/url?sa=E&q=http://localhost:4000/docs)

## **Доступные скрипты**
### **Backend** **(в качестве пакетного менеджера используется Yarn)**
- yarn start:dev — запуск сервера в режиме разработки.
- yarn build — сборка проекта для продакшена.
- yarn start:prod — сборка проекта для продакшена.
- yarn db:seed — заполнение БД тестовыми данными.
- yarn format — форматирование кода.
- yarn lint — проверка кода.
### **Frontend** **(в качестве пакетного менеджера используется Bun)**
- bun dev — запуск приложения в режиме разработки.
- bun build — сборка проекта для продакшена.
- bun start — запуск продакшн-сборки.
- bun generate — генерация API-клиента из Swagger-схемы.
- bun lint — проверка кода.
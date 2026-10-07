# MindHub — Frontend

Фронтенд продуктивити-платформы **MindHub**: рабочие пространства (workspaces), задачи с канбан-доской, тайм-блокинг дня и Pomodoro-таймер с историей сессий — в одном интерфейсе.

Связанный репозиторий backend: [MindHub-backend](https://github.com/Shadowharm/MindHub-backend)

## Стек технологий

- **Next.js 14** (App Router) + **TypeScript**
- **Chakra UI** + **Tailwind CSS** (через `tailwind-variants`) — UI-кит и стили
- **TanStack Query** — серверное состояние, кэширование, синхронизация с API
- **@dnd-kit** / **@hello-pangea/dnd** — drag-and-drop для канбан-доски и тайм-блоков
- **React Hook Form** — формы
- **Axios** — HTTP-клиент с интерсепторами и централизованной обработкой ошибок
- **js-cookie** — хранение access-токена
- **dayjs** — работа с датами

## Функциональность

- **Авторизация** — вход/регистрация, защищённые маршруты через `middleware.ts`
- **Workspaces** — рабочие пространства с разграничением ролей участников (Owner / Admin / Member), приглашение по email
- **Задачи** — канбан-доска с drag-and-drop, приоритетами (low / medium / high) и статусом выполнения, привязка к workspace
- **Time Blocking** — планирование дня блоками времени с сортировкой, цветовой маркировкой и подсчётом оставшихся часов
- **Pomodoro-таймер** — рабочие сессии и раунды, настраиваемые интервалы работы/отдыха, статистика за день
- **Настройки профиля** — персональные интервалы Pomodoro, данные пользователя

## Архитектура

Проект построен на App Router с чётким разделением слоёв:

```
src/
├── app/
│   ├── auth/                 # Страница авторизации
│   └── (dashboard)/          # Защищённая зона приложения
│       ├── workspaces/       # Список пространств и задачи внутри них
│       ├── time-blocking/    # Тайм-блокинг дня
│       ├── timer/            # Pomodoro-таймер и раунды
│       └── settings/         # Настройки пользователя
├── services/                 # Слой работы с API (auth, task, workspace, time-block, pomodoro, user)
├── api/                      # Axios-клиент, интерсепторы, обработка ошибок
├── hooks/                    # Переиспользуемые хуки (localStorage, outside-click, профиль)
├── types/                    # TypeScript-контракты для сущностей API
└── middleware.ts             # Защита маршрутов дашборда по токену
```

Каждая фича дашборда — это изолированный модуль со своими хуками (`useXxx.ts`) и компонентами, которые обращаются к соответствующему сервису из `src/services`.

## Запуск проекта

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Создайте `.env` и укажите адрес backend-API (см. `src/services`, используется `NEXT_PUBLIC_API_URL` или аналогичная переменная — сверьтесь с `src/api/interceptors.ts`).
3. Запустите dev-сервер:
   ```bash
   npm run dev
   ```
4. Откройте [http://localhost:3000](http://localhost:3000).

Для работы интерфейса требуется запущенный [MindHub-backend](https://github.com/Shadowharm/MindHub-backend).

## Скриншоты

<img width="1313" height="706" alt="image" src="https://github.com/user-attachments/assets/36bd90d6-0427-46ff-8d36-0beaea9e4d4e" />
<img width="1304" height="700" alt="image" src="https://github.com/user-attachments/assets/cb73597e-14b6-48b3-8445-f424e2cbe7de" />
<img width="1307" height="703" alt="image" src="https://github.com/user-attachments/assets/e0968563-c517-43c7-a866-fd6d9b004226" />
<img width="1312" height="704" alt="image" src="https://github.com/user-attachments/assets/f37f6b77-c7d2-41d7-9707-a1117eb0b625" />
<img width="1320" height="839" alt="image" src="https://github.com/user-attachments/assets/7aa41335-f256-4b57-bf0a-b70a8bc19693" />


## Автор

[Shadowharm](https://github.com/Shadowharm)

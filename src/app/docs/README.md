# Backend Documentation (Current Iteration)

## Передкомітні перевірки

1. Підтягнути актуальну базову гілку (`main`/`develop`)
2. Перевірити, що env-контракти не зламані (`.env.local`, `src/server/config/env.ts`)
3. Запустити обов'язкову перевірку: `npm run check`
4. Якщо змінювалися API-роути, перевірити локально success/error сценарії
5. Якщо змінювалися auth/permissions/errors, окремо перевірити 400/401/403/500/503 сценарії

- `curl http://localhost:3000/api/health`
- `curl http://localhost:3000/api/internal/firebase-check`
- `curl http://localhost:3000/api/admin/me`

6. Оновити документацію, якщо змінився контракт API або серверна поведінка
7. Комітити тільки після повністю успішного `npm run check`

## Що вже реалізовано у серверному фундаменті

### Базова серверна структура

Серверний код винесений у чіткі домени:

- `src/server/config` - конфігурація env
- `src/server/firebase` - інтеграція з Firebase Admin SDK
- `src/server/auth` - auth service та role/permission модель
- `src/server/middlewares` - auth/permission guards
- `src/server/lib` - загальні серверні утиліти (response/error/http/validation/pagination/wrappers)
- `src/app/api/*` - route handlers (контролери)

### Firebase Admin SDK

Реалізовано singleton-ініціалізацію Firebase Admin App з підтримкою:

- credentials з env (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`)
- fallback на ADC (Application Default Credentials)
- опціональний Storage bucket

Підключені модулі:

- `Auth`
- `Firestore`
- `Storage`

### Єдина API response-конвенція

Усі endpoint-и повертають стандартизовану форму відповіді:

Успіх:

```json
{
  "success": true,
  "data": {}
}
```

Помилка:

```json
{
  "success": false,
  "error": {
    "code": "SOME_ERROR_CODE",
    "message": "Human-readable public message"
  }
}
```

### Error Catalog + централізована обробка помилок

Є централізований каталог помилок (`API_ERROR_CATALOG`), який визначає:

- canonical error code
- HTTP status
- safe public message

`ApiError.fromCode(...)` застосовує ці правила централізовано.

`handleApiRoute(...)` виконує boundary-обробку:

- нормалізує винятки
- формує стандартизовану error-відповідь
- логує інцидент

### Request tracing (`x-request-id`)

Для кожного API-запиту забезпечується request id:

- береться з вхідного `x-request-id` (якщо валідний)
- або генерується автоматично
- повертається у response header
- потрапляє в error-логи

### `withApi` wrapper (уніфікований pipeline)

Запроваджено `withApi(...)`, який централізує типові кроки обробки запиту:

- request id
- валідація query/body
- auth перевірка
- permission перевірка
- pagination parsing
- єдиний формат response/error

### Admin Auth Firebase ID Token (поточна ітерація)

Реалізовано production-oriented auth flow для адмін API:

- `extractIdToken(request)` витягує токен лише з `Authorization: Bearer <ID_TOKEN>`
- `verifyIdToken(token)` виконує перевірку через Firebase Admin SDK (режим залежить від середовища)
- `requireAuth(...)` повертає нормалізований auth context (`uid`, `email`, `claims`, `role`)
- `withAdminApi(...)` примусово застосовує auth + admin access permission для `/api/admin/*`

Environment policy:

- `development`: verification без revocation check (`checkRevoked=false`) для швидкого локального циклу
- `staging/production`: verification з revocation check (`checkRevoked=true`)
- `developer` role має розширені права лише у `development`; у non-dev доступ обмежений

### Pagination contract

Реалізовано єдиний контракт пагінації:

- підтримка `offset` mode (`page`, `limit`)
- підтримка `cursor` mode (`cursor`, `limit`)
- взаємовиключність cursor/page
- єдина meta-структура для list responses
- додатково створено `withPaginatedApi(...)` для list-endpoint-ів, де pagination гарантовано присутня в контексті handler

## Поточні API endpoint-и

### `GET /api/health`

Призначення: базова liveness-перевірка сервісу.

Повертає:

- статус `ok`
- поточне середовище (`env`)
- timestamp

### `GET /api/internal/firebase-check`

Призначення: внутрішня перевірка доступності Firebase сервісів у non-production середовищі.

Особливості:

- вимкнено в production
- додатково керується env-прапорцем `INTERNAL_FIREBASE_CHECK_ENABLED`
- Firestore check: write/read/delete smoke cycle
- Storage check опційний через `FIREBASE_CHECK_STORAGE`

### `GET /api/admin/me`

Призначення: повернення server-trusted профілю автентифікованого користувача.

Логіка:

- auth через Firebase ID token
- admin access enforcement через middleware wrapper
- повернення актуального профілю з Firebase Admin SDK

## Auth/Role модель (поточний стан)

- Ролі: `admin`, `developer`, `manager`
- Permissions: централізовані в `ROLE_PERMISSIONS`
- Перевірка прав: `requirePermission(...)`
- `admin` має повний доступ
- `developer` має повний доступ лише у `development` середовищі

## Ключові env-параметри (поточна ітерація)

- `NODE_ENV`
- `API_VERSION`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_CHECK_STORAGE`
- `INTERNAL_FIREBASE_CHECK_ENABLED`
- `ADMIN_BOOTSTRAP_EMAILS`

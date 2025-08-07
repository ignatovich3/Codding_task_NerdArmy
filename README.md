Dziękuję za wyjaśnienia i przesłane zrzuty oraz strukturę katalogów. Na tej podstawie przygotowałem kompletne i profesjonalne **README.md**, dopasowane dokładnie do Twojego projektu:

---

# 🌸 Codding\_task\_NerdArmy — Inwentaryzacja Kwiatów

Kompletny system do zarządzania inwentarzem kwiatów, zbudowany w architekturze **full-stack**:

* 💻 **Frontend webowy** – React
* 📱 **Aplikacja mobilna** – React Native + Expo
* ⚙️ **Backend** – FastAPI + PostgreSQL

---

## 🧱 Zawartość repozytorium

```
project-root/
│
├── backend/         # FastAPI backend + baza PostgreSQL
├── frontend/        # Webowa aplikacja React
├── mobile_app/      # Aplikacja mobilna React Native (Expo)
└── mockups/         # Makiety ekranów w HTML
```

---

## 🛠️ Technologie

| Warstwa  | Stos technologiczny                            |
| -------- | ---------------------------------------------- |
| Backend  | FastAPI, PostgreSQL, SQLAlchemy, JWT, Pydantic |
| Frontend | React, React Router, Axios                     |
| Mobilna  | React Native, Expo, Axios, React Navigation    |

---

## ⚙️ Backend (FastAPI + PostgreSQL)

### 📁 Struktura

```
backend/
├── main.py               # Główne wejście do aplikacji
├── models.py             # Modele SQLAlchemy
├── schemas.py            # Schematy Pydantic
├── crud.py               # Logika biznesowa
├── auth.py               # Autoryzacja i JWT
├── database.py           # Konfiguracja połączenia z DB
├── requirements.txt      # Wymagania pip
├── .env                  # Zmienne środowiskowe (np. DB URL, JWT_SECRET)
```


---


## 🧩 Jak skonfigurować bazę danych PostgreSQL lokalnie

Aby uruchomić aplikację z działającą bazą danych PostgreSQL lokalnie, wykonaj poniższe kroki:

### ✅ 1. Zainstaluj PostgreSQL

- Pobierz i zainstaluj PostgreSQL: https://www.postgresql.org/download/
- Podczas instalacji:
  - Zapisz nazwę użytkownika (np. `postgres`)
  - Zapisz hasło (np. `admin`)
  - Zalecane: zainstaluj pgAdmin (graficzne narzędzie do zarządzania bazą)

---

### ✅ 2. Stwórz bazę danych

####  Przez terminal (psql)

```bash
psql -U postgres
CREATE DATABASE flowers_db;
````

---

### ✅ 3. Skonfiguruj plik `.env` (w katalogu `backend/`)

Utwórz plik `.env` (jeśli go nie ma) i wklej:

```env
DATABASE_URL=postgresql://postgres:twoje_haslo@localhost:5432/flowers_db
```

> Upewnij się, że hasło i dane połączenia są zgodne z tymi, które ustawiłeś przy instalacji PostgreSQL.

---

### ✅ 4. Uruchom backend

Zainstaluj zależności i odpal backend lokalnie:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Dla aplikacji mobilnej uruchom backend na adresie dostępnym z sieci lokalnej:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---



### 🧪 6. Testowanie połączenia

* Otwórz przeglądarkę i wejdź na: [http://localhost:8000/docs](http://localhost:8000/docs)
* Możesz testować tam wszystkie endpointy dostępne w API

---

🔐 Autoryzacja

* JWT Token (nagłówek: `Authorization: Bearer <token>`)
* Token generowany po zalogowaniu (endpoint: `/login`)

### 📚 Dokumentacja Swagger

* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🌐 Frontend Web (React)

### 📁 Struktura

```
frontend/
├── src/
│   ├── components/      # Komponenty UI
│   ├── App.js           # Routery + Layout
│   ├── api.js           # Połączenia HTTP (axios)
│   └── styles.css
├── public/
├── package.json
```

### ▶️ Uruchomienie frontendu

```bash
cd frontend
npm install
npm start
```

Dostępne pod: [http://localhost:3000](http://localhost:3000)

---

## 📱 Aplikacja mobilna (React Native + Expo)

### 📁 Struktura

```
mobile_app/
├── app/                 # Ekrany aplikacji
├── components/          # Komponenty wielokrotnego użytku
├── utils/               # Konfiguracje (np. API)
├── app.json             # Konfiguracja Expo
├── expo-env.d.ts
```
Oczywiście! Poniżej masz gotowy fragment w formacie **Markdown**, który możesz wkleić do pliku `README.md` (np. do sekcji konfiguracji aplikacji mobilnej):




---

## 🌐 Konfiguracja adresu IP w aplikacji mobilnej (`utils/api.js`)

Aby aplikacja mobilna mogła komunikować się z backendem działającym lokalnie, należy skonfigurować poprawny adres IP komputera w pliku `api.js`.

> 🔁 Domyślny kod wygląda tak:

```js
// utils/api.js
const API_URL = 'http://192.168.100.3:8000'; 
````

### ✅ Jak ustawić własny adres IP?

1. **Otwórz terminal (Windows)** i wpisz:

```bash
ipconfig
```

2. Odszukaj swój adres IP lokalny (np. `192.168.0.15`) – zazwyczaj pod `IPv4 Address`.
3. Skopiuj ten adres i wklej go zamiast `192.168.100.3`:

```js
const API_URL = 'http://192.168.0.15:8000';
```

4. Upewnij się, że backend jest uruchomiony z flagą `--host 0.0.0.0`:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---


### ▶️ Uruchomienie aplikacji mobilnej

1. Zainstaluj Expo CLI (jeśli nie masz):

```bash
npm install -g expo-cli
```

2. Odpal aplikację:

```bash
cd mobile_app
npm install
npx expo start
```

3. Zeskanuj QR kod aplikacją **Expo Go** na telefonie.




---

## 📷 Makiety / Prototypy
Znajdują się w katalogu `mockups/` w formie HTML. Można je otworzyć w przeglądarce i przeklikiwać między ekranami aplikacji.


---

## 🧠 Architektura bazy danych

* Tabela `users`: id, username, email, hashed\_password
* Tabela `flowers`: id, name, description, category, quantity, status, user\_id (FK)

---

## ✅ Funkcjonalności

| Funkcja                       | Web | Mobile |
| ----------------------------- | --- | ------ |
| 🔍 Przeglądanie listy kwiatów | ✅   | ✅      |
| ➕ Dodawanie nowych kwiatów    | ✅   | ✅      |
| 🖊️ Edycja kwiatów            | ✅   | ✅      |
| ❌ Usuwanie kwiatów            | ✅   | ✅      |
| 🔒 Logowanie JWT              | ✅   | ✅      |

---

## ✍️ Autor

Projekt stworzony w ramach zadania
**Coding Task — NerdArmy**
Autor: *Sofiya Ignatovich*

---



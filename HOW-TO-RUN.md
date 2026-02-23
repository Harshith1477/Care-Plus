# Care Plus — How to Run (Localhost Preview)

## 1. Start the backend API (Terminal 1)

**Important:** The chatbot needs this API to be running. Start it first.

```bash
cd careplus-api
npm install
npm start
```

**Backend runs at:** http://localhost:3001

- Health check: http://localhost:3001/api/health
- Appointments and chat are served from this URL.
- If you get "address already in use", stop any other process using port 3001, then run `npm start` again.

---

## 2. Start the frontend (Terminal 2)

```bash
cd "Careplus- web/health-triage-pal-main"
npm install
npm run dev
```

**Frontend (app preview) runs at:** http://localhost:8080

- Open this URL in your browser to use Care Plus.
- Booking and chat will call the API at http://localhost:3001 (set in `.env` as `VITE_API_URL`).

---

## Summary

| What              | URL                      |
|-------------------|--------------------------|
| **App (preview)** | **http://localhost:8080** |
| **API**           | http://localhost:3001    |

Keep both terminals running. Open **http://localhost:8080** to see the app.

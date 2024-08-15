Flask

```console
pipenv install
pipenv shell
cd server
flask db init
flask db migrate -m "message"
flask db upgrade
python seed.py
python app.py
```

Vite

```console
npm install --prefix client
npm run dev --prefix client
```

---

Goals:

- Create an interface where doctors/staff can find patients info, appointments, doctor notes, and chart history

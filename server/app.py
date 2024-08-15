#!/usr/bin/env python3

from flask import request, session
from config import app, db
from models import db, User, Patient, Doctor, Appointments



@app.post('/api/users')
def create_user():
    pass

@app.get('/api/check_session')
def check_session():
    pass

@app.post('/api/login')
def login():
    pass

@app.delete('/api/logout')
def logout():
    pass




@app.route('/')
def index():
    return '<h1>Project Server</h1>'




if __name__ == '__main__':
    app.run(port=5555, debug=True)


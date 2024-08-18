from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Patient, Doctor, Appointment, DoctorNote, Chart

# Initialize the Flask application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

@app.post('/api/user')
def create_user():
   data = request.json
   try:
       new_user = User(username=data['username'])
       new_user.password = data['passsword']
       db.session.add(new_user)
       db.session.commit()
       session['user_id'] = new_user.id
       return new_user.to_dict(), 201
   except Exception as e:
       return { 'error': str(e)}, 406

@app.get('/api/check_session')
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.where(User.id == user_id).first()
        return user.to_dict(), 200
    else:
        return {}, 200


@app.post('/api/login')
def login():
    pass

@app.delete('/api/logout')
def logout():
    session.pop('user_id')
    return {}, 204


@app.post('/api/doctor_notes')
def create_note():
    try:
        data = request.json
        new_note = DoctorNote(**data)
        new_note.user_id = session['user_id']
        db.session.add(new_note)
        db.session.commit()
    except Exception as e:
        return {'error': str(e)}, 406

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)


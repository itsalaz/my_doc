from flask import Flask, request, session, jsonify
from werkzeug.security import generate_password_hash
from models import User, Patient, Doctor, Appointment
from config import app, db, bcrypt 

@app.post('/api/users')
def create_user():
    data = request.json
    try:
        new_user = User(username=data['username'])
        new_user.password = data['password']
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id 
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get('/api/check_session')
def check_session():
    user_id = session.get('user_id')

    if user_id:
        user = User.query.where(User.id == user_id).first()
        return user.to_dict(), 200
    else:
        return {}, 204

@app.post('/api/login')
def login():
    data = request.json 
    user = User.query.where(User.username == data['username']).first()
    if user and user.authenticate(data['password']):
        session['user_id'] = user.id 
        return user.to_dict(), 201
    else:
        return { 'error': 'Invalid username or password' }, 401

@app.delete('/api/logout')
def logout():
    session.pop('user_id')
    return {}, 204

# @app.post('/api/doctor_notes')
# def create_note():
#     try:
#         data = request.json
#         new_note = DoctorNote(**data)
#         new_note.user_id = session['user_id']
#         db.session.add(new_note)
#         db.session.commit()
#     except Exception as e:
#         return {'error': str(e)}, 406
@app.get('/api/patients')
def get_patients():
    patient_list = Patient.query.all()
    patient_dicts = [ patient.to_dict() for patient in  patient_list]

    return patient_dicts, 200

@app.get('/api/patients/<int:id>')
def get_patient(id):
    # 1. SQLALchemy query to get an artist by thier id
    found_patient = Patient.query.where(Patient.id == id).first()
    # 2. Conditional if the artist exists
    if found_patient:
    # 2a. Return the found artist 
        return found_patient.to_dict(), 200
    # 3. if no artist then..
    else:
    # 3a. Return an erroe message with the 404 status code
        return {"error": "Not found"}, 404
    
@app.get('/api/appointments')
def get_appointment():
    appointments = Appointment.query.all()
    return jsonify([appointment.to_dict() for appointment in appointments])


@app.get('/')
def index():
    pass



if __name__ == '__main__':
    app.run(port=5555, debug=True)
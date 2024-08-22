from flask import Flask, request, session, jsonify
from werkzeug.security import generate_password_hash
from models import User, Patient, Doctor, Appointment
from config import app, db, bcrypt 
from datetime import datetime


# START USERS/CHECK

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

#END USERS/CHECK

#START APPOINTMENTS

@app.get('/api/appointments')
def get_appointments():
    apt_list = Appointment.query.all()
    apt_dicts = [ appointment.to_dict() for appointment in apt_list]
 
    return apt_dicts, 200

@app.get('/api/appointments/<int:appointment_id>')
def get_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    
    if not appointment:
        return jsonify({"message": "Appointment not found"}), 404
    
    patient = Patient.query.get(appointment.patient_id)
    doctor = Doctor.query.get(appointment.doctor_id)
    
    if patient:
        patient_name = patient.name
    else:
        patient_name = "Unknown"
    
    if doctor:
        doctor_name = doctor.name
    else:
        doctor_name = "Unknown"
    
    return jsonify({
        'id': appointment.id,
        'datetime': appointment.datetime,
        'patient_name': patient_name,
        'doctor_name': doctor_name
    })
 

@app.post('/api/appointments')
def create_appointment():
    data = request.get_json()
    datetime_str = data.get('datetime')
    patient_id = data.get('patient_id')
    doctor_id = data.get('doctor_id')

    if not datetime_str or not patient_id or not doctor_id:
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        appointment_datetime = datetime.fromisoformat(datetime_str)
    except ValueError:
        return jsonify({'message': 'Invalid datetime format'}), 400

    existing_appointment = Appointment.query.filter_by(
        doctor_id=doctor_id,
        datetime=appointment_datetime
    ).first()

    if existing_appointment:
        return jsonify({'message': 'Appointment slot is already taken'}), 400

    patient = Patient.query.get(patient_id)
    if not patient:
        return jsonify({"message": "Patient not found"}), 404

    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return jsonify({"message": "Doctor not found"}), 404

    new_appointment = Appointment(
        datetime=appointment_datetime,
        patient_id=patient_id,
        doctor_id=doctor_id
    )

    try:
        db.session.add(new_appointment)
        db.session.commit()

        response = {
            'id': new_appointment.id,
            'datetime': new_appointment.datetime.isoformat(),
            'patient_name': patient.name,
            'doctor_name': doctor.name,
        }

        return jsonify(response), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Failed to create appointment'}), 500
    
# END APPOINTMENTS

# START DOCTORS

@app.get('/api/doctors')
def get_doctors():
    doctor_list = Doctor.query.all()
    doctor_dicts = [ doctor.to_dict() for doctor in doctor_list]

    return doctor_dicts, 200

@app.get('/api/doctors/<int:id>')
def get_doctor(id):
    found_doctor = Doctor.query.where(Doctor.id == id).first()
    if found_doctor:
      return found_doctor.to_dict(), 200

    else:
      return {"error": "Not found"}, 404

# END DOCTORS

# START PATIENTS

@app.get('/api/patients')
def get_patients():
    patient_list = Patient.query.all()
    patient_dicts = [ patient.to_dict() for patient in  patient_list]

    return patient_dicts, 200



@app.post('/api/patients')
def create_patient():
    data = request.get_json()
    
    try:
        # Convert the date string to a datetime.date object if necessary
        dob = datetime.strptime(data.get('dob'), '%Y-%m-%d').date() if data.get('dob') else None
        
        new_patient = Patient(
            name=data.get('name'),
            dob=dob,
            ssn=data.get('ssn'),
            email=data.get('email'),
            address=data.get('address'),
            phone_number=data.get('phone_number')
        )
        
        db.session.add(new_patient)
        db.session.commit()

        # Manually construct the response dictionary to exclude fields
        patient_dict = {
            'id': new_patient.id,
            'name': new_patient.name,
            'dob': new_patient.dob,
            'ssn': new_patient.ssn,
            'email': new_patient.email,
            'address': new_patient.address,
            'phone_number': new_patient.phone_number
        }
        
        return jsonify(patient_dict), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.get('/api/patients/<int:id>')
def get_patient(id):
    found_patient = Patient.query.where(Patient.id == id).first()
    if found_patient:
      return found_patient.to_dict(), 200

    else:
      return {"error": "Not found"}, 404

    
@app.patch('/api/patients/<int:id>')
def patch_patient_by_id(id):
    found_patient = Patient.query.where(Patient.id == id).first()


    if found_patient:
        data = request.json
        try:
            for key in data:
                setattr(found_patient, key, data['key'])
            db.session.add(found_patient)
            db.session.commit()
            return found_patient.to_dict(), 200
        except:
            return {'error': 'Invalid data'}, 400
    else:
        return {'error': 'Not found'}, 404
    
@app.delete('/api/patient/<int:id>')
def delete_patient_by_id(id):

    found_patient = Patient.query.where(Patient.id == id).first()

    if found_patient:
        db.session.delete(found_patient)
        db.session.commit()
        return {}, 204
    else:
        return {'error': 'Not found'}, 404
    
# END PATIENTS




@app.get('/')
def index():
    pass



if __name__ == '__main__':
    app.run(port=5555, debug=True)
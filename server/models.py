from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt 


class User(db.Model, SerializerMixin):

  __tablename__ = 'users_table'




class Doctor(db.Model, SerializerMixin):
  
  __tablename__ = 'doctors_table'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  specialty = db.Column(db.String)
  doctor_note_id = db.Column(db.String, db.ForeignKey('doctors_notes.id'))

  notes = db.relationship('DoctorNote', back_populates='doctor', cascade='all, delete-orphan')
  appointments = db.relationship('Appointment', back_populates='doctors')

  serialize_rules = ('-appointments.doctor', '-notes.doctor',)



class Appointment(db.Model, SerializerMixin):
  __tablename__ = 'appointments_table'
  

  id = db.Column(db.Integer, primary_key=True)
  datetime = db.Column(db.DateTime)
  doctor_id = db.Column(db.Integer, db.ForeignKey('doctors_table.id'), nullable=False)
  patient_id = db.Column(db.Integer, db.ForeignKey('patients_table.id', nullable=False))

  patient = db.relationship('Patient', back_populates='appointments')
  doctor = db.relationship('Doctor', back_populates='appointments')

  serialize_rules = ('-patient.appointments', '-doctor.appointments',)



class Patient(db.Model, SerializerMixin):

  __tablename__ = 'patients_table'


  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  dob = db.Column(db.Integer, nullable=False)
  chart_id = db.Column(db.String, db.ForeignKey('chart_table.id'), nullable=False)

  appointments = db.relationship('Appointment', back_populates='patient')

  serialize_rules = ('appointments.patient',)




class DoctorNote(db.Model, SerializerMixin):
  __tablename__ = 'doctors_notes'

  id = db.Column(db.Integer, primary_key=True)
  note = db.Column(db.Integer, primary_key=True)
  date = db.Column(datetime)
  doctor_id = db.Column(db.Integer, db.ForeignKey('doctors_table.id'))


  doctors = db.relationship('Doctor', back_populates='notes', cascade='all, delete-orphan')
# not every user can access and post doctor notes, only doctor-users can do so 


class Chart(db.Model, SerializerMixin):
  __tablename__ = 'chart_table'


  id = db.Column(db.Integer, primary_key=True)
  info = db.Column(db.String)

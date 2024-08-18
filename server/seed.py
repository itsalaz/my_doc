#!/usr/bin/env python3

from config import app, db
from models import Doctor, Patient, Appointment, Chart, DoctorNote, User 
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        print("Clearing old data...")

        Doctor.query.delete()
        Patient.query.delete()
        Appointment.query.delete()
        Chart.query.delete()
        DoctorNote.query.delete()
        User.query.delete()

        db.session.commit()

         # Add new data
        print("Adding new data...")
        
        # Example: Create charts
        for _ in range(5):
            chart = Chart(info=fake.text())
            db.session.add(chart)

        # Example: Create users
        for _ in range(5):
            user = User(username=fake.user_name(), password_hash=fake.password())
            db.session.add(user)

        # Example: Create doctors
        for _ in range(5):
            doctor = Doctor(name=fake.name(), specialty=fake.word(), user_id=1)  # Example user_id=1
            db.session.add(doctor)

        # Example: Create patients
        for _ in range(5):
            patient = Patient(name=fake.name(), dob=fake.date_of_birth(minimum_age=0, maximum_age=100).year, chart_id=1)  # Example chart_id=1
            db.session.add(patient)

        # Example: Create appointments
        for _ in range(5):
            appointment = Appointment(datetime=fake.date_time_this_year(), doctor_id=1, patient_id=1)  # Example doctor_id=1 and patient_id=1
            db.session.add(appointment)

        # Example: Create doctor notes
        for _ in range(5):
            note = DoctorNote(note=fake.text(), date=fake.date_time_this_year(), doctor_id=1)  # Example doctor_id=1
            db.session.add(note)

        db.session.commit()
        print("Seeding complete!")
#!/usr/bin/env python3

from config import app, db
from models import Doctor, Patient, Appointment, Chart, DoctorNote, User 
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db
from datetime import datetime



   
fake = Faker()

# def generate_unique_email(existing_emails):
#     while True:
#         email = fake.email()
#         if email not in existing_emails:
#             existing_emails.add(email)
#             return email

def seed_database():
    with app.app_context():
        print("Database URI:", db.engine.url)
        print("Starting seed...")
        print("Clearing old data...")

        # Delete existing data
        Doctor.query.delete()
        Patient.query.delete()
        Appointment.query.delete()
        Chart.query.delete()
        DoctorNote.query.delete()
        User.query.delete()

        db.session.commit()

        # Add new data
        print("Adding new data...")

        # Create charts
        charts = [Chart(info=fake.text()) for _ in range(5)]
        db.session.bulk_save_objects(charts)

        # Create users
        users = [User(username=fake.user_name(), password=fake.password()) for _ in range(5)]
        db.session.bulk_save_objects(users)

        # Create doctors
        doctors = [Doctor(name=fake.name(), specialty=fake.word(), user_id=randint(1, 5)) for _ in range(5)]
        db.session.bulk_save_objects(doctors)

        # existing_emails = set()
        # Create patients
        patients = [Patient(
            name=fake.name(), 
            dob=fake.date_of_birth(minimum_age=0, maximum_age=100),  # Full date of birth
            ssn=fake.random_int(min=100000000, max=999999999),
            email=fake.email(),
            address=fake.address(),
            phone_number=fake.phone_number(),
            year_joined=randint(1900, datetime.now().year),  # Ensure year is an integer and within a valid range
            chart_id=randint(1, 5)
        ) for _ in range(5)]
        db.session.bulk_save_objects(patients)

       

        # Create appointments
        appointments = [Appointment(
            datetime=fake.date_time_this_year(), 
            doctor_id=randint(1, 5), 
            patient_id=randint(1, 5)  
        ) for _ in range(5)]
        db.session.bulk_save_objects(appointments)

        # Create doctor notes
        notes = [DoctorNote(
            note=fake.text(), 
            date=fake.date_time_this_year(), 
            doctor_id=randint(1, 50)
        ) for _ in range(5)]
        db.session.bulk_save_objects(notes)

        db.session.commit()
        print("Seeding complete!")

if __name__ == '__main__':
    seed_database()
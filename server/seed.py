#!/usr/bin/env python3

from config import app, db
from models import Doctor, Patient, Appointment, DoctorNote, User 
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db
from datetime import datetime
from random import randint 


fake = Faker()

current_year = datetime.now().year

def seed_database():
    with app.app_context():
        print("Database URI:", db.engine.url)
        print("Starting seed...")
        print("Clearing old data...")


        Doctor.query.delete()
        Patient.query.delete()
        Appointment.query.delete()
        DoctorNote.query.delete()
        User.query.delete()

        db.session.commit()


        print("Adding new data...")


        users = [User(username=fake.user_name(), password=fake.password()) for _ in range(5)]
        db.session.bulk_save_objects(users)
        db.session.commit()  # Commit to save users


        doctors = [Doctor(name=fake.name(), specialty=fake.word(), user_id=randint(1, 5)) for _ in range(5)]
        db.session.bulk_save_objects(doctors)
        db.session.commit()  # Commit to save doctors



        patients = [
            Patient(
                name=fake.name(),
                dob=fake.date_of_birth(minimum_age=0, maximum_age=100),
                ssn=fake.random_int(min=100000000, max=999999999),
                email=fake.email(),
                address=fake.address(),
                phone_number=''.join([str(randint(0, 9)) for _ in range(10)]),  # 10-digit phone
                year_joined=randint(2023, current_year),  # Must match your validator
            )
            for _ in range(5)
    ]


        appointments = [Appointment(
            datetime=fake.date_time_this_year(), 
            doctor_id=randint(1, 5), 
            patient_id=randint(1, 5)  
        ) for _ in range(5)]
        db.session.bulk_save_objects(appointments)


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
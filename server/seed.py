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


        db.session.commit()
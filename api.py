from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app=FastAPI()

origins = [
    "*",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,    
    allow_credentials=True,
    allow_methods=["*"],      
    allow_headers=["*"],
)

stu_rec=[
        {"stu_name":"stu_1","pswd":"pw1","email":"sem1","mob":"mob1","college":"nsec","city":"city1","state":"state1","skillset":["python", "mongodb"], "cv_link":"link1"}
        ]
msme_rec=[
        {"msme_name":"msme_1","pswd":"pw1","email":"mem1","mob":"mob1","city":"city1","state":"state1","license_link":"lic_link","job_wanted":"job1","job_desc":"jd1"}
        ]
job_postings = ["job1"]


@app.get("/student/signin/{email}/{pswd}")
def student_login(email: str, pswd: str):
    for rec in stu_rec:
        if rec["email"] == email and rec["pswd"] == pswd:
            return "WELCOME"
    
    return "Record not found"

@app.get("/msme/signin/{email}/{pswd}")
def msme_login(email: str, pswd: str):
    for rec in stu_rec:
        if rec["email"] == email and rec["pswd"] == pswd:
            return "WELCOME"
    
    return "Record not found"


@app.post("/msme/add-job/{msme_name}/{job_title}/{job_desc}")
def add_job(company_name: str, job_title: str, job_desc: str):
    new_job = {
        "company": company_name,
        "title": job_title,
        "description": job_desc
    }
    job_postings.append(new_job)
    return "Job Posted  ->"+ str(new_job)

from typing import Annotated, List
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import BytesIO
import joblib
from DataModel import Document, Prediction
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000","https://proyectobi.pukini.dev"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model.joblib")

@app.get("/", include_in_schema=False)
def docs():
    return RedirectResponse(url="/docs")

"""
ENDPOINT 1
"""

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = File(...)):
    if file.filename.split(".")[-1] not in ["csv", "xlsx"]:
        raise HTTPException(status_code=400, detail="Archivo no permitido")
    data = await file.read() 
    df = pd.read_excel(BytesIO(data))
    print(df.sample(5))
    return {"filename": file.filename}

@app.get("/downloadfile")
async def download_data():
    pass

"""

ENDPOINT 2

"""

@app.post("/predict")
async def predict(data: List[Document]):
    data_list = [data.model_dump() for data in data]
    df = pd.DataFrame(data_list)
    print(df)
    result = model.predict(df)
    result_list = result.tolist()
    return result_list



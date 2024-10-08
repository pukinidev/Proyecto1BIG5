import io
import os
from typing import List
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, RedirectResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import BytesIO
import joblib
from DataModel import Document

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

@app.post("/retrain")
async def retrain_model(file: UploadFile = File(...)):
    if file.filename.split(".")[-1] not in ["csv", "xlsx"]:
        raise HTTPException(status_code=400, detail="Archivo no permitido")
    
    data = await file.read() 
    df = pd.read_excel(BytesIO(data))
    
    try:
        X = df.drop("sdg", axis=1)
        y = df["sdg"]
    except KeyError:
        raise HTTPException(status_code=400, detail="La columna objetivo 'sdg' no se encontró en el archivo")
    
    # Retrain the model with the new data
    model.fit(X, y)
    
    # Optionally, save the updated model back to disk
    joblib.dump(model, 'model.joblib')
    
    return {"message": "El modelo fue reentrenado correctamente con nueva informacion!"}

"""

ENDPOINT 2

"""

@app.post("/predict")
async def predict(data: List[Document]):
    model = joblib.load("model.joblib")
    data_list = [item.model_dump() for item in data]
    df = pd.DataFrame(data_list)
    try:
        labels = model.classes_ 
        probabilities = model.predict_proba(df)
        result_list = [
            [(str(label), float(prob)) for label, prob in zip(labels, probs)]
            for probs in probabilities
        ]
        
        return result_list
    except Exception as e:
        return {"error": str(e)}
    

@app.post("/predict_from_excel")
async def predict_from_excel(file: UploadFile = File(...)):
    if file.filename.split(".")[-1] not in ["csv", "xlsx"]:
        raise HTTPException(status_code=400, detail="Archivo no permitido")
    
    model = joblib.load("model.joblib")
    
    try:
        df = pd.read_excel(file.file)
    except Exception as e:
        return {"error": f"Failed to read Excel file: {str(e)}"}
    
    try:
        labels = model.classes_
        probabilities = model.predict_proba(df)
        
        results = []
        for probs in probabilities:
            result = {str(label): prob for label, prob in zip(labels, probs)}
            results.append(result)
        
        results_df = pd.DataFrame(results)
        
        output = io.BytesIO()
        
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            results_df.to_excel(writer, index=False)

        output.seek(0)

        headers = {
            'Content-Disposition': 'attachment; filename="predictions.xlsx"'
        }

        return StreamingResponse(output, headers=headers, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    
    except Exception as e:
        return {"error": str(e)}
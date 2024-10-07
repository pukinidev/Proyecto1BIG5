from typing import Annotated
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import BytesIO


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000","https://proyectobi.pukini.dev"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
def docs():
    return RedirectResponse(url="/docs")

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = File(...)):
    data = await file.read()
    df = pd.read_excel(BytesIO(data))
    print(df.sample(5))
    return {"filename": file.filename}

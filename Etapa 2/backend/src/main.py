from typing import Annotated
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
def docs():
    return RedirectResponse(url="/docs")

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = File(...)):
    data = await file.read()
    with open(f"data/{file.filename}", "wb") as f:
        f.write(data)
    return {"filename": file.filename}

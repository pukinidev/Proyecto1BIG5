from pydantic import BaseModel

class Document(BaseModel):
    Textos_espanol: str

class Prediction(BaseModel):
    Textos_espanol: str
    SDG: str

class Predictions(BaseModel):
    predicciones: list[Prediction]
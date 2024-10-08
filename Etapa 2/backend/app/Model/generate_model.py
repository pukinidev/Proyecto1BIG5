from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from Preprocessing import Preprocesamiento
from Normalizacion import Normalizacion
from sklearn.model_selection import KFold
from sklearn.model_selection import GridSearchCV
import pandas as pd
from sklearn.model_selection import train_test_split
import joblib

url_data = 'https://github.com/pukinidev/Proyecto1BIG5/blob/main/Etapa%201/data/ODScat_345.xlsx?raw=true'
data = pd.read_excel(url_data)
Y = data['sdg']
X = data.drop(['sdg'], axis=1)
X_train, X_test, Y_train, Y_test = train_test_split(X,Y, test_size=0.2, random_state=42)

vect_m1 = TfidfVectorizer()

logr_m1 = LogisticRegression()

pipeline_m1 = Pipeline([
    ('preprocesamiento', Preprocesamiento()),
    ('normalizacion', Normalizacion()),
    ('vectorizacion', vect_m1),
    ('modelo', logr_m1)
])

particiones = KFold(n_splits=10, shuffle=True, random_state = 0)

param_grid_m1 = {"modelo__C": [0.01, 0.1, 1, 5] }

grid_search_m1 = GridSearchCV(pipeline_m1, param_grid_m1, cv=particiones, scoring='accuracy')

grid_search_m1 = grid_search_m1.fit(X_train , Y_train)

mejor_model_m1 = grid_search_m1.best_estimator_

joblib.dump(mejor_model_m1, "model.joblib")



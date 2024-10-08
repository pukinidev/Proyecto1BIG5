from sklearn.base import BaseEstimator, TransformerMixin
from nltk.stem import SnowballStemmer

stemmer = SnowballStemmer('spanish')

class Normalizacion(BaseEstimator, TransformerMixin):

    def fit(self, X, y=None):
        return self

    def stem_words(self, words):
        return [stemmer.stem(word) for word in words]

    def transform(self, X):
        X = X.apply(self.stem_words)
        X = X.apply(lambda x: ' '.join(x))
        return X

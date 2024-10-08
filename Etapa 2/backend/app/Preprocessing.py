from sklearn.base import BaseEstimator, TransformerMixin
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import unicodedata
import re

nltk.download('all')

class Preprocesamiento(BaseEstimator, TransformerMixin):

      def fit(self, X, y=None):
          return self

      def remove_non_ascii(self,words):
          """Remove non-ASCII characters from list of tokenized words"""
          new_words = []
          for word in words:
              new_word = unicodedata.normalize('NFKD', word).encode('ascii', 'ignore').decode('utf-8', 'ignore')
              new_words.append(new_word)
          return new_words

      def to_lowercase(self,words):
          """Convert all characters to lowercase from list of tokenized words"""
          new_words = []
          for word in words:
              new_word = word.lower()
              new_words.append(new_word)
          return new_words

      def remove_punctuation_and_numbers(self,words):
          """Remove punctuation and numbers from list of tokenized words, accounting for Spanish characters."""
          # This pattern removes punctuation and digits
          pattern = r'[!"#\$%&\'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`\{\|\}~¿¡0-9]'
          new_words = []
          for word in words:
              # Remove punctuation and numbers using the updated pattern
              new_word = re.sub(pattern, '', word)
              if new_word != '':
                  new_words.append(new_word)
          return new_words


      def remove_stopwords(self,words, stopwords=stopwords.words('spanish')):
          """Remove stop words from list of tokenized words"""
          new_words = []
          for word in words:
              if word not in stopwords:
                  new_words.append(word)
          return new_words

      def remove_numbers(self,words):
          """Remove all interger occurrences in list of tokenized words"""
          new_words = []
          for word in words:
              palabra = ''
              for char in word:
                  if not char.isdigit():
                      palabra = palabra + char
              if palabra != '':
                  new_words.append(palabra)
          return new_words
#lenguaje de las palabras
#encoding del archivo que suba la persona
#preguntarle a don gepeto


      def preprocessing(self, words):
          words = self.to_lowercase(words)
          words = self.remove_non_ascii(words)
          words = self.remove_numbers(words)
          words = self.remove_punctuation_and_numbers(words)
          words = self.remove_stopwords(words)
          return words

      def transform(self, X):
          X['Textos_espanol'] = X['Textos_espanol'].apply(word_tokenize)
          X['Textos_espanol'] = X['Textos_espanol'].apply(self.preprocessing)
          return X['Textos_espanol']

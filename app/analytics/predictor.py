import sys
from gensim import corpora, matutils
from morphological_analyze import morphological_analyze
from sklearn.svm import LinearSVC
from sklearn.externals import joblib

dictionary = corpora.Dictionary.load_from_text('app/analytics/dictionary.txt')
input_text = sys.stdin.readline()
words = morphological_analyze(input_text)
bow = dictionary.doc2bow(words)
dense = list(matutils.corpus2dense([bow], num_terms=len(dictionary)).T[0])

estimator = joblib.load('app/analytics/linear_svm.pkl')
# print(estimator.predict([dense])[0])
sys.stdout.write(estimator.predict([dense])[0])

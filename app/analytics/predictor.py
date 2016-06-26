# あらかじめ作成していた学習器を用いて入力された質問に対する正しい回答IDを返却するスクリプトです
import sys
from gensim import corpora, matutils
from morphological_analyze import morphological_analyze
from sklearn.externals import joblib

dictionary = corpora.Dictionary.load_from_text('app/analytics/dictionary.txt')
input_text = sys.stdin.readline()
words = morphological_analyze(input_text)
bow = dictionary.doc2bow(words)
dense = list(matutils.corpus2dense([bow], num_terms=len(dictionary)).T[0])

estimator = joblib.load('app/analytics/linear_svm.pkl')
sys.stdout.write(estimator.predict([dense])[0])

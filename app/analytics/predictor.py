# あらかじめ作成していた学習器を用いて入力された質問に対する正しい回答IDを返却するスクリプトです
import sys
from gensim import corpora, matutils
from morphological_analyze import morphological_analyze
from sklearn.externals import joblib
import os
import json

def predict(input_text):
    dictionary = corpora.Dictionary.load_from_text('%s/dictionary.txt' % (os.environ["INQUIRY_BOT_PROJECT_DIR"]))
    words = morphological_analyze(input_text)
    bow = dictionary.doc2bow(words)
    dense = list(matutils.corpus2dense([bow], num_terms=len(dictionary)).T[0])

    estimator = joblib.load('%s/linear_svm.pkl' % (os.environ["INQUIRY_BOT_PROJECT_DIR"]))
    return json.dumps({"answer_id": estimator.predict([dense])[0]})

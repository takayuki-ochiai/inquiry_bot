import sys
from gensim import corpora, matutils, models
from morphological_analyze import morphological_analyze
from sklearn.svm import LinearSVC
from sklearn import cross_validation
from sklearn.grid_search import GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import json

from sklearn.metrics.pairwise import cosine_similarity

def predict_questions():
    # tf-idf化
    #The defaults for min_df and max_df are 1 and 1.0, respectively. This basically says "If my term is found in only 1 document, then it's ignored. Similarly if it's found in all documents (100% or 1.0) then it's ignored."
    vectorizer = TfidfVectorizer(analyzer=morphological_analyze)
    question_keys =  sys.stdin.readline().rstrip().split(",")
    question_texts = sys.stdin.readline().rstrip().split(",")
    input_text = sys.stdin.readline().rstrip()
    question_texts.append(input_text)
    # チャット欄に入力された文書と、各回答に紐づく質問をinjectしたテキストについて正規化したtfidfベクトルの配列に変換する
    vector_train = vectorizer.fit_transform(question_texts)

    # 類似度計算
    cosine_similarities = cosine_similarity(vector_train[-1], vector_train[0:-1])[0]
    # 回答IDと類似度のDictionaryを作る
    label_similarities_dict = {}
    for i, answer_id in enumerate(question_keys):
        label_similarities_dict[answer_id] = cosine_similarities[i]

    # Dictionaryをcosine類似度でソートして上位5件を表示する
    predict_questions = sorted(label_similarities_dict.items(), key=lambda x:-x[1])[0:5]
    return ','.join(list(map(lambda x:x[0], predict_questions)))

# sys.stdout(predict_questions())
sys.stdout.write(predict_questions())

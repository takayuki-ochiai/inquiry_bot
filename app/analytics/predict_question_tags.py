import sys
from gensim import corpora, matutils, models
from morphological_analyze import morphological_analyze
from morphological_analyze import morphological_reading_analyze
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
    vectorizer = TfidfVectorizer(analyzer=morphological_reading_analyze)
    question_keys =  sys.stdin.readline().rstrip().split(",")
    question_texts = sys.stdin.readline().rstrip().split(",")
    input_text = sys.stdin.readline().rstrip()
    question_texts.append(input_text)
    # チャット欄に入力された文書と、各回答に紐づく質問をinjectしたテキストについて正規化したtfidfベクトルの配列に変換する
    vector_train = vectorizer.fit_transform(question_texts)

    feature_names = vectorizer.get_feature_names()

    # 正規化されたtfidf値が0.25以上のものをその質問のなかで特徴的な単語として考慮する
    """
    {
        '77': ['なおし', 'めーる', 'もじばけ'],
        '1': ['おっと', 'かぞく', 'かーど', 'くれじっと', 'しはらい', 'しよう', 'つま']
    }
    """
    label_important_words_dict = {}
    vectors = vector_train.toarray()
    for i, answer_id in enumerate(question_keys):
        for j, value in enumerate(vectors[i]):
            if value > 0.25:
                if answer_id in label_important_words_dict:
                    label_important_words_dict[answer_id].append(feature_names[j])
                else:
                    label_important_words_dict[answer_id] = [feature_names[j]]

    return json.dumps(label_important_words_dict)
    # for vector in vector_train.toarray():
    #     for index, value in enumerate(vector):
    #         if value > 0.25:
    #             print(feature_names[index])



    # 類似度計算
    # cosine_similarities = cosine_similarity(vector_train[-1], vector_train[0:-1])[0]
    # # 回答IDと類似度のDictionaryを作る
    # label_similarities_dict = {}
    # for i, answer_id in enumerate(question_keys):
    #     label_similarities_dict[answer_id] = cosine_similarities[i]
    #
    # # Dictionaryをcosine類似度でソートして上位5件を表示する
    # predict_questions = sorted(label_similarities_dict.items(), key=lambda x:-x[1])[0:5]
    # return ','.join(list(map(lambda x:x[0], predict_questions)))

# sys.stdout(predict_questions())
sys.stdout.write(predict_questions())

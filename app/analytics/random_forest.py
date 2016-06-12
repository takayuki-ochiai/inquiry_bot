import pdb
import MeCab
import sys
from gensim import corpora, matutils, models
import pickle
import json
from morphological_analyze import morphological_analyze
from sklearn.ensemble import RandomForestClassifier
from sklearn.cross_validation import train_test_split
from sklearn.grid_search import GridSearchCV

dictionary = corpora.Dictionary.load_from_text('app/analytics/dictionary.txt')

# 正解の回答IDの配列
label_train = sys.stdin.readline().split(",")

# 各質問中の名詞、動詞、形容詞、形容動詞が入っている配列in配列
words_train = list(map(morphological_analyze, sys.stdin.readline().split(",")))

bow_corpus = list(map(dictionary.doc2bow, words_train))
# corpora.MmCorpus.serialize('app/analytics/random_forest_bow_copus.mm', bow_corpus)

# 次元を300まで削減した特徴ベクトルの配列を作る
# 0 が3×3の2次元配列を生成
# 正答率がwwwwww20%台までwwwwww下がったwwwwww草不可避wwwww
# topic_num = 500
# lda = models.LdaModel(bow_corpus, id2word=dictionary, num_topics=topic_num)
# vector_train = [[0] * topic_num for i in range(len(label_train))]
# for index, topics_per_document in enumerate(lda[bow_corpus]):
#     print(topics_per_document)
#     for topic in topics_per_document:
#         vector_train[index][topic[0]] = topic[1]
# for vector in vector_train:
#     print(vector)

bow_train = list(map(dictionary.doc2bow, words_train))
#
# # 各質問毎の特徴ベクトルの配列in配列を生成する
vector_train = []
for bow in bow_train:
    dense = list(matutils.corpus2dense([bow], num_terms=len(dictionary)).T[0])
    vector_train.append(dense)

# パラメーターの最適地を探す
# tuned_parameters = [{'n_estimators': [10, 30, 50, 70, 90, 110, 130, 150], 'max_features': ['auto', 'sqrt', 'log2', None]}]
# vector_train_s, vector_test_s, label_train_s, label_test_s = train_test_split(vector_train, label_train, test_size=0.2)
# clf = GridSearchCV(RandomForestClassifier(), tuned_parameters, cv=2, scoring='accuracy', n_jobs=-1)
# clf.fit(vector_train_s, label_train_s)
#
# print("ベストパラメタを表示")
# print(clf.best_estimator_)
#
# print("トレーニングデータでCVした時の平均スコア")
# for params, mean_score, all_scores in clf.grid_scores_:
#     print("{:.3f} (+/- {:.3f}) for {}".format(mean_score, all_scores.std() / 2, params))
#
#
# y_true, y_pred = label_test_s, clf.predict(vector_train_s)
# print(classification_report(y_true, y_pred))


# 7割を学習用、 3割を試験用にするテストを10回実行して正解率の平均値を算出する
# ランダムフォレストのパラメータは調整が必要
accuracy_rates = []
for var in range(0, 200):
    vector_train_s, vector_test_s, label_train_s, label_test_s = train_test_split(vector_train, label_train, test_size=0.05)
    estimator = RandomForestClassifier(n_estimators=90, max_features='sqrt')
    # 学習用に切り出したやつだけで学習
    estimator.fit(vector_train_s, label_train_s)
    average = estimator.score(vector_test_s, label_test_s)
    print(average)
    accuracy_rates.append(average)

print("平均値")
print(sum(accuracy_rates)/len(accuracy_rates))

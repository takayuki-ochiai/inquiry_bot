import sys
from gensim import corpora, matutils, models
from morphological_analyze import morphological_analyze
from sklearn.ensemble import RandomForestClassifier
from sklearn import cross_validation
from sklearn.grid_search import GridSearchCV
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

dictionary = corpora.Dictionary.load_from_text('app/analytics/dictionary.txt')

# # 正解の回答IDの配列
label_train = sys.stdin.readline().split(",")
question_train = sys.stdin.readline().split(",")

# # 各質問中の名詞、動詞、形容詞、形容動詞が入っている配列in配列
# words_train = list(map(morphological_analyze, question_train))
# bow_train = list(map(dictionary.doc2bow, words_train))
# # # 各質問毎の特徴ベクトルの配列in配列を生成する
# vector_train = []
# for bow in bow_train:
#     dense = list(matutils.corpus2dense([bow], num_terms=len(dictionary)).T[0])
#     vector_train.append(dense)

# tf-idf化
#The defaults for min_df and max_df are 1 and 1.0, respectively. This basically says "If my term is found in only 1 document, then it's ignored. Similarly if it's found in all documents (100% or 1.0) then it's ignored."
vectorizer = TfidfVectorizer(analyzer=morphological_analyze, max_features=300)
vector_train = vectorizer.fit_transform(question_train)

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
estimator = RandomForestClassifier(n_estimators=40, max_features='sqrt')
scores = cross_validation.cross_val_score(estimator, vector_train, label_train, cv=5)
print("Accuracy: %0.2f (+/- %0.2f)" % (scores.mean(), scores.std() * 2))

# 8割を学習用、 2割を試験用にするテストを10回実行して正解率の平均値を算出する
# accuracy_training_rates = []
# accuracy_rates = []
# for var in range(0, 100):
#     vector_train_s, vector_test_s, label_train_s, label_test_s = train_test_split(vector_train, label_train, test_size=0.2)
#     estimator = RandomForestClassifier(n_estimators=40, max_features='sqrt')
#     # 学習用に切り出したやつだけで学習
#     estimator.fit(vector_train_s, label_train_s)
#
#     test_average = estimator.score(vector_test_s, label_test_s)
#     training_average = estimator.score(vector_train_s, label_train_s)
#     accuracy_training_rates.append(training_average)
#     accuracy_rates.append(test_average)
#
# print("テストセット正解率平均値")
# print(sum(accuracy_rates)/len(accuracy_rates))
# print("テストセット正解率標準偏差")
# data = np.array(accuracy_rates)
# print(str(np.std(data)))
#
# print("トレーニングセット正解率平均値")
# print(sum(accuracy_training_rates)/len(accuracy_training_rates))
# print("トレーニングセット正解率標準偏差")
# train_data = np.array(accuracy_training_rates)
# print(str(np.std(train_data)))

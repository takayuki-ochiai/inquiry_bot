import sys
from gensim import corpora, matutils
from morphological_analyze import morphological_analyze
from sklearn.svm import LinearSVC
from sklearn.externals import joblib

# from sklearn import cross_validation

dictionary = corpora.Dictionary.load_from_text('app/analytics/dictionary.txt')

# 正解の回答IDの配列
label_train = sys.stdin.readline().rstrip().split(",")
# 質問の配列
question_train = sys.stdin.readline().rstrip().split(",")

# 各質問中の名詞、動詞、形容詞、形容動詞が入っている配列in配列
words_train = list(map(morphological_analyze, question_train))

# あらかじめ作成しておいた辞書を用いて単語群をbag of wordsに変換
bow_train = list(map(dictionary.doc2bow, words_train))

# 各質問毎の特徴ベクトルの配列in配列を生成する
vector_train = []
for bow in bow_train:
    dense = list(matutils.corpus2dense([bow], num_terms=len(dictionary)).T[0])
    vector_train.append(dense)

# 線形SVM
estimator = LinearSVC()
estimator.fit(vector_train, label_train)

# 永続化しておく
joblib.dump(estimator, 'app/analytics/linear_svm.pkl')

# cross_validation
# scores = cross_validation.cross_val_score(estimator, vector_train, label_train, cv=5)
# print("Accuracy: %0.2f (+/- %0.2f)" % (scores.mean(), scores.std() * 2))

# tf-idf化
#The defaults for min_df and max_df are 1 and 1.0, respectively. This basically says "If my term is found in only 1 document, then it's ignored. Similarly if it's found in all documents (100% or 1.0) then it's ignored."
# vectorizer = TfidfVectorizer(analyzer=morphological_analyze, max_features=300)
# vector_train = vectorizer.fit_transform(question_train)

# チューニングパラメーター
# vector_train_s, vector_test_s, label_train_s, label_test_s = train_test_split(vector_train, label_train, test_size=0.2)
# tuned_parameters = [{'C': [0.8, 0.9, 1, 1.1, 1.2], 'dual': [True, False], 'multi_class':['ovr', 'crammer_singer']}]
#
# scores = ['accuracy', 'precision', 'recall']
# for score in scores:
#     print ('\n' + '='*50)
#     print (score)
#     print ('='*50)
#
#     clf = GridSearchCV(LinearSVC(), tuned_parameters, cv=5, scoring=score, n_jobs=-1)
#     clf.fit(vector_train_s, label_train_s)
#
#     print("\n+ ベストパラメータ:\n")
#     print(clf.best_estimator_)
#
#     print("\n+ トレーニングデータでCVした時の平均スコア:\n")
#     for params, mean_score, all_scores in clf.grid_scores_:
#         print("{:.3f} (+/- {:.3f}) for {}".format(mean_score, all_scores.std() / 2, params))

import sys
from gensim import corpora, matutils, models
from morphological_analyze import morphological_analyze
from sklearn.ensemble import RandomForestClassifier
from sklearn.cross_validation import train_test_split
from sklearn.grid_search import GridSearchCV
import numpy as np

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
topic_num = 500
lda = models.LdaModel(bow_corpus, id2word=dictionary, num_topics=topic_num)
vector_train = [[0] * topic_num for i in range(len(label_train))]
for index, topics_per_document in enumerate(lda[bow_corpus]):
    print(topics_per_document)
    for topic in topics_per_document:
        vector_train[index][topic[0]] = topic[1]
for vector in vector_train:
    print(vector)


# 7割を学習用、 3割を試験用にするテストを10回実行して正解率の平均値を算出する
# ランダムフォレストのパラメータは調整が必要
accuracy_training_rates = []
accuracy_rates = []
for var in range(0, 100):
    vector_train_s, vector_test_s, label_train_s, label_test_s = train_test_split(vector_train, label_train, test_size=0.2)
    # estimator = RandomForestClassifier()
    estimator = RandomForestClassifier(n_estimators=40, max_features='sqrt')
    # 学習用に切り出したやつだけで学習
    estimator.fit(vector_train_s, label_train_s)

    test_average = estimator.score(vector_test_s, label_test_s)
    training_average = estimator.score(vector_train_s, label_train_s)
    accuracy_training_rates.append(training_average)
    accuracy_rates.append(test_average)

print("テストセット正解率平均値")
print(sum(accuracy_rates)/len(accuracy_rates))
print("テストセット正解率標準偏差")
data = np.array(accuracy_rates)
print(str(np.std(data)))

print("トレーニングセット正解率平均値")
print(sum(accuracy_training_rates)/len(accuracy_training_rates))
print("トレーニングセット正解率標準偏差")
train_data = np.array(accuracy_training_rates)
print(str(np.std(train_data)))

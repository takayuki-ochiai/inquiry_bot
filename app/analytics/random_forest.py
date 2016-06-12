import pdb
import MeCab
import sys
from gensim import corpora, matutils
import pickle
import json
from morphological_analyze import morphological_analyze
from sklearn.ensemble import RandomForestClassifier
from sklearn.cross_validation import train_test_split

dictionary = corpora.Dictionary.load_from_text('app/analytics/dictionary.txt')

# 正解の回答IDの配列
label_train = sys.stdin.readline().split(",")

# 各質問中の名詞、動詞、形容詞、形容動詞が入っている配列in配列
words_train = list(map(morphological_analyze, sys.stdin.readline().split(",")))

bow_train = list(map(dictionary.doc2bow, words_train))

# 各質問毎の特徴ベクトルの配列in配列を生成する
vector_train = []
for bow in bow_train:
    dense = list(matutils.corpus2dense([bow], num_terms=len(dictionary)).T[0])
    vector_train.append(dense)


# 7割を学習用、 3割を試験用にするテストを10回実行して正解率の平均値を算出する
accuracy_rates = []
for var in range(0, 50):
    vector_train_s, vector_test_s, label_train_s, label_test_s = train_test_split(vector_train, label_train, test_size=0.2)
    estimator = RandomForestClassifier()
    # 学習用に切り出したやつだけで学習
    estimator.fit(vector_train_s, label_train_s)
    average = estimator.score(vector_test_s, label_test_s)
    print(average)
    accuracy_rates.append(average)

print("平均値")
print(sum(accuracy_rates)/len(accuracy_rates))
# print(label_train)
# print(vector_train)
# answer_id_content_hash = json.loads(input_line)

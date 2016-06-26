# Bag of wordsなどを作成するために使用する辞書を生成するためのスクリプトです。
# 生成された辞書はテキストファイルとして保存され、必要な時にロードされます。
import MeCab
import sys
from gensim import corpora
from morphological_analyze import morphological_analyze
# mecab = MeCab.Tagger ("-Ochasen")
## neologdを使うときはこうする
mecab = MeCab.Tagger ("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd")

input_line = sys.stdin.readline()
texts = input_line.split(",")

# mapとfilter関数はPython2とPython3で挙動が違うので超注意
# tokenize("テスト用のテキスト作るのも楽じゃない")
words = list(map(morphological_analyze, texts))

dictionary = corpora.Dictionary(words)
dictionary.save_as_text('app/analytics/dictionary.txt')

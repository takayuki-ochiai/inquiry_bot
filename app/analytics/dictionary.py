import pdb
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

# pdb.set_trace()
dictionary = corpora.Dictionary(words)
print(dictionary)
dictionary.save_as_text('app/analytics/dictionary.txt')

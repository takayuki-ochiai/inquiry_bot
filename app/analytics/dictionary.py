import pdb
import MeCab
import sys
from gensim import corpora
# mecab = MeCab.Tagger ("-Ochasen")
## neologdを使うときはこうする
mecab = MeCab.Tagger ("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd")

input_line = sys.stdin.readline()
texts = input_line.split(",")

# 形態素解析を行い名詞、動詞、形容詞、形容動詞のみをとりだす
def tokenize(text):
    node = mecab.parseToNode(text)
    words = []
    while node:
        pos = node.feature.split(',')[0]
        if pos == '名詞' or pos == '動詞' or pos == '形容詞' or pos == '形容動詞':
            word = node.feature.split(',')[6]
            words.append(word)
        node = node.next
    return words

# mapとfilter関数はPython2とPython3で挙動が違うので超注意
words = list(map(tokenize, texts))

# pdb.set_trace()
dictionary = corpora.Dictionary(words)
dictionary.save_as_text('app/analytics/dictionary.txt')

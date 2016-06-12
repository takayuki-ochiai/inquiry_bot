import MeCab

## neologdを使うときはこうする
mecab = MeCab.Tagger ("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd")

# 形態素解析を行い名詞、動詞、形容詞、形容動詞のみをとりだす
# 重複した単語は重複した状態のまま表示される
def morphological_analyze(text):
    node = mecab.parseToNode(text)
    words = []
    while node:
        pos = node.feature.split(',')[0]
        if pos == '名詞' or pos == '動詞' or pos == '形容詞' or pos == '形容動詞':
            word = node.feature.split(',')[6]
            words.append(word)
        node = node.next
    return words

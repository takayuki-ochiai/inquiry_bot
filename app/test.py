import MeCab
# mecab = MeCab.Tagger ("-Ochasen")
## neologdを使うときはこうする
mecab = MeCab.Tagger ("-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd")
print(mecab.parse("『アイドルマスター シンデレラガールズ』（THE IDOLM@STER CINDERELLA GIRLS）は、バンダイナムコエンターテインメント（旧バンダイナムコゲームス）とCygamesが開発・運営する『THE IDOLM@STER』の世界観をモチーフとする携帯端末専用のソーシャルゲーム。"))

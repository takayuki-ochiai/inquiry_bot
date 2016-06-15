require 'open3'
# あらかじめ教師あり学習していた分類器を用いて、入力された文書にふさわしい回答を応答するためのクラスです。
# 実質的な処理はほぼ全てPython3に依存させており、分類器には線形SVMを使っています
class Predictor
  attr_accessor :text
  def initialize(text)
    @text = text
  end

  def predict
    answer_id = Open3.capture3("python app/analytics/predictor.py", stdin_data: text)[0]
    Answer.find(answer_id).content
  end
end

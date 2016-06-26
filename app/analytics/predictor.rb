require 'open3'
# あらかじめ教師あり学習していた分類器を用いて、入力された文書にふさわしい回答や質問候補を応答するためのクラスです。
# 実質的な処理はほぼ全てPython3に依存させています

class Predictor
  # 入力された文章の内容から１つの回答を推測して返します。
  # @param [String] question 質問文
  # @return [String] 入力された質問から推測された回答内容
  def self.predict(question)
    answer_id = Open3.capture3('python app/analytics/predictor.py', stdin_data: question)[0]
    Answer.find(answer_id).content
  end

  # 質問内容のレコメンドに使う質問と、質問内の重要語句のタグをハッシュ化した構造を生成します。
  # 生成に２〜３秒かかるので、一度生成したものは１日はキャッシュして使用します。
  def self.suggestions
    Rails.cache.fetch('recommending_questions', expires_in: 24.hours) do
      PredictorPreprocessor.suggestions
    end
  end
end

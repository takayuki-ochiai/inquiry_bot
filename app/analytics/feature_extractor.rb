require 'open3'
# 文章から特徴ベクトルを抽出するためのクラスです。
# 実質的な処理はほぼ全てPython3に依存させています。
class FeatureExtractor
  # 全質問文と回答文の内容から辞書を作成する
  def create_dictionary
    answer_contents = Answer.pluck(:content).join(',')
    question_contents = Question.pluck(:content).join(',')
    texts = "#{answer_contents},#{question_contents}"
    out, err, status = Open3.capture3("python app/analytics/dictionary.py", stdin_data: texts)
  end
end

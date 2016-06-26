require 'open3'
# 機械学習による予測を行うための前処理を行うクラスです。
# 結果はテキストファイルに保存したりキャッシュしたりシリアライズして保存し、あとで読み込めるような形で保持します。
# 実質的な処理はほぼ全てPython3に依存させています。
class PredictorPreprocessor
  # 全質問文と回答文の内容から辞書を作成します。
  # 作成された辞書はテキストファイルで保存されます。
  def self.create_dictionary
    question_contents = Question.pluck(:content).join(',')
    texts = "#{question_contents}"
    Open3.capture3("python app/analytics/dictionary.py", stdin_data: texts)
  end

  # 回答ごとに重要なキーワードの読みの配列をタグとしてハッシュ化します。
  # 作成された回答とタグの組み合わせは一定時間キャッシュします。
  # @return [Array] id, content, tagsをキーにするHashを要素とする配列
  def self.suggestions
    # 回答IDごとの設問の内容をすべて連結したハッシュを作成する
    answer_id_content_hash = Question.pluck(:answer_id, :content).reduce({}) do |result, array|
      if result.has_key?(array[0])
        result[array[0]] = result[array[0]] + array[1]
      else
        result[array[0]] = array[1]
      end
      result
    end

    predict_question_tags = Open3.popen3("python app/analytics/predict_question_tags.py") do |stdin, stdout, stderr, wait_thr|
      # Rubyのハッシュのkeysとvaluesは要素の順序が保持される
      stdin.puts answer_id_content_hash.keys.join(',')
      stdin.puts answer_id_content_hash.values.join(',')
      stdin.close
      JSON.parse(stdout.read)
    end

    questions = Question.recommended.pluck(:answer_id, :content)

    suggestions = questions.map do |question|
      {
        id: question[0],
        content: question[1],
        tags: predict_question_tags[question[0].to_s]
      }
    end
    suggestions
  end

  # 線形SVMを使って回答と設問の間の関係を学習させます。
  # 学習した結果はシリアライズして保存しておきます。
  # @return [nil] 戻り値なし
  def self.learn_linear_svm
    answer_id_and_content = Question.pluck(:answer_id, :content)
    answer_id_and_content.map{|array| array[0].to_s}.join(',')
    answer_id_and_content.map{|array| array[1]}.join(',')

    # カンマ区切り文字列として渡す
    Open3.popen3("python app/analytics/learn_linear_svm.py") do |stdin, stdout, stderr, wait_thr|
      stdin.puts answer_id_and_content.map{|array| array[0].to_s}.join(',')
      stdin.puts answer_id_and_content.map{|array| array[1]}.join(',')
      stdin.close
      puts stdout.read
      puts stderr.read
    end
  end


  # ここから下は使わないが、備忘録としてコメントアウトで残しておくコード

  # 入力されたテキストに関連性が高そうな回答IDを上位5件表示します。
  # def predict_questions(text)
  #   # 回答IDごとの設問の内容をすべて連結したハッシュを作成する
  #   # この方法は別で使う
  #   # ハッシュをJSON化してシリアライズしてPythonに渡して機械学習する
  #   answer_id_content_hash = Question.pluck(:answer_id, :content).reduce({}) do |result, array|
  #     if result.has_key?(array[0])
  #       result[array[0]] = result[array[0]] + array[1]
  #     else
  #       result[array[0]] = array[1]
  #     end
  #     result
  #   end
  #
  #   answer_ids = Open3.popen3("python app/analytics/predict_questions.py") do |stdin, stdout, stderr, wait_thr|
  #     # Rubyのハッシュのkeysとvaluesは要素の順序が保持される
  #     stdin.puts answer_id_content_hash.keys.join(',')
  #     stdin.puts answer_id_content_hash.values.join(',')
  #     stdin.puts text
  #     stdin.close
  #     # puts stdout.read
  #     stdout.read.split(',')
  #   end
  #   answer_ids
  # end
  #
  #
  # # ランダムフォレストを用いた多クラス分類を用いて機械学習
  # def learn_with_random_forest
  #   answer_id_and_content = Question.pluck(:answer_id, :content)
  #   answer_id_and_content.map{|array| array[0].to_s}.join(',')
  #   answer_id_and_content.map{|array| array[1]}.join(',')
  #   # カンマ区切り文字列として渡す
  #   Open3.popen3("python app/analytics/random_forest.py") do |stdin, stdout, stderr, wait_thr|
  #     stdin.puts answer_id_and_content.map{|array| array[0].to_s}.join(',')
  #     stdin.puts answer_id_and_content.map{|array| array[1]}.join(',')
  #     stdin.close
  #     puts stdout.read
  #     puts stderr.read
  #   end
  # end
  #
  # def learn_with_naive_bayes
  #   answer_id_and_content = Question.pluck(:answer_id, :content)
  #   answer_id_and_content.map{|array| array[0].to_s}.join(',')
  #   answer_id_and_content.map{|array| array[1]}.join(',')
  #
  #   # カンマ区切り文字列として渡す
  #   Open3.popen3("python app/analytics/naive_bayes.py") do |stdin, stdout, stderr, wait_thr|
  #     stdin.puts answer_id_and_content.map{|array| array[0].to_s}.join(',')
  #     stdin.puts answer_id_and_content.map{|array| array[1]}.join(',')
  #     stdin.close
  #     puts stdout.read
  #     puts stderr.read
  #   end
  # end
  #
  # # ldaを用いた機械学習
  # def learn_with_lda
  #   answer_id_and_content = Question.pluck(:answer_id, :content)
  #   answer_id_and_content.map{|array| array[0].to_s}.join(',')
  #   answer_id_and_content.map{|array| array[1]}.join(',')
  #
  #   # カンマ区切り文字列として渡す
  #   Open3.popen3("python app/analytics/lda.py") do |stdin, stdout, stderr, wait_thr|
  #     stdin.puts answer_id_and_content.map{|array| array[0].to_s}.join(',')
  #     stdin.puts answer_id_and_content.map{|array| array[1]}.join(',')
  #     stdin.close
  #     puts stdout.read
  #     puts stderr.read
  #   end
  # end
end

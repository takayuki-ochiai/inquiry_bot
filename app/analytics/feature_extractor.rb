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

  # ランダムフォレストを用いた多クラス分類を用いて機械学習
  def learn_with_random_forest
    answer_id_and_content = Question.pluck(:answer_id, :content)
    answer_id_and_content.map{|array| array[0].to_s}.join(',')
    answer_id_and_content.map{|array| array[1]}.join(',')

    # カンマ区切り文字列として渡す
    Open3.popen3("python app/analytics/random_forest.py") do |stdin, stdout, stderr, wait_thr|
      stdin.puts answer_id_and_content.map{|array| array[0].to_s}.join(',')
      stdin.puts answer_id_and_content.map{|array| array[1]}.join(',')
      stdin.close
      puts stdout.read
      puts stderr.read
    end
  end

  def learn_with_linear_svc
    answer_id_and_content = Question.pluck(:answer_id, :content)
    answer_id_and_content.map{|array| array[0].to_s}.join(',')
    answer_id_and_content.map{|array| array[1]}.join(',')

    # カンマ区切り文字列として渡す
    Open3.popen3("python app/analytics/linear_svc.py") do |stdin, stdout, stderr, wait_thr|
      stdin.puts answer_id_and_content.map{|array| array[0].to_s}.join(',')
      stdin.puts answer_id_and_content.map{|array| array[1]}.join(',')
      stdin.close
      puts stdout.read
      puts stderr.read
    end
  end

  def learn_with_naive_bayes
    answer_id_and_content = Question.pluck(:answer_id, :content)
    answer_id_and_content.map{|array| array[0].to_s}.join(',')
    answer_id_and_content.map{|array| array[1]}.join(',')

    # カンマ区切り文字列として渡す
    Open3.popen3("python app/analytics/naive_bayes.py") do |stdin, stdout, stderr, wait_thr|
      stdin.puts answer_id_and_content.map{|array| array[0].to_s}.join(',')
      stdin.puts answer_id_and_content.map{|array| array[1]}.join(',')
      stdin.close
      puts stdout.read
      puts stderr.read
    end
  end



  # ldaを用いた機械学習
  def learn_with_lda
    answer_id_and_content = Question.pluck(:answer_id, :content)
    answer_id_and_content.map{|array| array[0].to_s}.join(',')
    answer_id_and_content.map{|array| array[1]}.join(',')

    # カンマ区切り文字列として渡す
    Open3.popen3("python app/analytics/lda.py") do |stdin, stdout, stderr, wait_thr|
      stdin.puts answer_id_and_content.map{|array| array[0].to_s}.join(',')
      stdin.puts answer_id_and_content.map{|array| array[1]}.join(',')
      stdin.close
      puts stdout.read
      puts stderr.read
    end
  end



  # 回答IDごとの設問の内容をすべて連結したハッシュを作成する
  # この方法は別で使う
  # ハッシュをJSON化してシリアライズしてPythonに渡して機械学習する
  # answer_id_content_hash = Question.pluck(:answer_id, :content).reduce({}) do |result, array|
  #   if result.has_key?(array[0])
  #     result[array[0]] = result[array[0]] + array[1]
  #   else
  #     result[array[0]] = array[1]
  #   end
  #   result
  # end
end

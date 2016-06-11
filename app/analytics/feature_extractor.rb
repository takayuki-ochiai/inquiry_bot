require 'open3'
# 文章から特徴ベクトルを抽出するためのクラスです。
# 実質的な処理はほぼ全てPython3に依存させています。
class FeatureExtractor
  def test
    out, err, status = Open3.capture3("python app/test.py")
    p out
    p err
    p status
  end
end

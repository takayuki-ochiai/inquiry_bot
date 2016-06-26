class Question < ActiveRecord::Base
  belongs_to :answer

  # 質問のサジェスチョンに使用する質問のみを抽出するスコープです
  scope :recommended, -> { where(is_recommended: true) }
end

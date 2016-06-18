class Question < ActiveRecord::Base
  belongs_to :answer
  scope :recommended, -> { where(is_recommended: true) }
end

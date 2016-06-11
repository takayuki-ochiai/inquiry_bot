class ModifyAnswerContent < ActiveRecord::Migration
  def change
    change_column :answers, :content, :text, null: false
  end
end

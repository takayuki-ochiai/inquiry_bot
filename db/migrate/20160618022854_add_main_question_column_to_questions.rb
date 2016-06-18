class AddMainQuestionColumnToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :is_recommended, :boolean, default: false, null: false
  end
end

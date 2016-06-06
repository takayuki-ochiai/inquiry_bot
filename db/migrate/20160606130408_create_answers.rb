class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :content, null: false # 内容
      t.string :question_header, null: false # 質問見出し
      t.timestamps null: false
    end
  end
end

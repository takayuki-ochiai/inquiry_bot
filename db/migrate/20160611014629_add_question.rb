class AddQuestion < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :content, null: false # 内容
      t.integer :answer_id, null: false # 回答id
      t.integer :category # 質問カテゴリ
      t.timestamps null: false
    end
  end
end

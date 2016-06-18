# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

i = 1
CSV.foreach('db/fixtures/development/answers.csv') do |row|
  Answer.create(
    id: i,
    question_header: row[0],
    content: row[1]
  )
  i += 1
end

CSV.foreach('db/fixtures/development/questions.csv') do |row|
  Question.create(
    answer_id: row[0],
    content: row[1],
    is_recommended: row[2]
  )
end

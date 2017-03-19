# -*- coding:utf-8 -*-
from bottledaemon import daemon_run
from bottle import route, run, request
from predict_question_tags import predict_question_tags
from predictor import predict

@route("/question_tags", method = "post")
def question_tags():
    keys = request.json['keys']
    values = request.json["values"]
    return predict_question_tags(keys, values)

@route("/predict", method = "post")
def question_tags():
    question = request.json['question']
    return predict(question)

if __name__ == "__main__":
    daemon_run(host="0.0.0.0", port=8080)

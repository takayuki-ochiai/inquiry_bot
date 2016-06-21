using HashCamelizeKeys
module V1
  class Predictor < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    resource :predictor do
      resource :questions do
        desc '入力された質問にふさわしい回答を返却します'
        post '/' do
          # answer = ::Predictor.predict(action_dispatch_params[:question])
          answer = ::Predictor.predict(params[:question])
          { answer: answer }.camelize_keys(:lower)
        end
      end

      resource :suggestions do
        desc 'レコメンドする代表的な質問を返却します'
        get '/' do
          { suggestions: ::Predictor.recommending_questions }.camelize_keys(:lower)
        end
      end
    end
  end
end

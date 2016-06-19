module V1
  class Root < Grape::API
    # http://localhost:3000/api/v1/
    prefix :api
    version 'v1'
    format :json

    rescue_from :all do |e|
      Root.logger.error(e.message.to_s << "\n" << e.backtrace.join("\n"))
      error!({ message: "Server Error"}, 500)
    end

    helpers do
      # grapeはparamsにjson_param_key_transformでsnake_caseに変換したparamsを取得できない。
      # このメソッドはsnake_caseに変換したパラメーターをActionController::Parametersにラップして渡してあげるメソッド
      def action_dispatch_params
        @action_dispatch_params ||= ActionController::Parameters.new(@env['action_dispatch.request.request_parameters'])
      end
    end

    mount V1::Predictor
  end
end

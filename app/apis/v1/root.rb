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

    mount V1::Rooms
    mount V1::Recipes
  end
end

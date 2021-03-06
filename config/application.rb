require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module InquiryBot
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    # ライブラリ直下のファイルを読み込む
    config.autoload_paths += %W(#{config.root}/lib)

    # キャッシュにredisを使用する
    config.cache_store = :redis_store, "redis://127.0.0.1:6379/0/inquiry_bot", { expires_in: 90.minutes }
    # config.cache_store = :memory_store, { size: 64.megabytes, :expires_in => 3.minutes }

    # app/analytics/ 下のRuby ファイルが読み込まれるようにする
    config.autoload_paths += %W(#{config.root}/app/analytics)

    # app/apis/ 下の Ruby ファイルが読み込まれるようにする
    config.paths.add File.join('app', 'apis'), glob: File.join('**', '*.rb')
    config.autoload_paths += Dir[Rails.root.join('app', 'apis', '*')]

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
  end
end

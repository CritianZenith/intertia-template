# frozen_string_literal: true

InertiaRails.configure do |config|
  config.ssr_enabled = false
  config.version = ViteRuby.digest
end

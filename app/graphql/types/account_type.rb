# frozen_string_literal: true

module Types
  class AccountType < Types::BaseObject
    description "An account in the application"

    def self.authorized?(object, context)
      object.users.include?(context[:current_user])
    end

    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :name, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :avatar_url, String, null: true

    field :account_users, [ Types::AccountUserType ], null: false

    def avatar_url
      object.avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_url(object.avatar) : nil
    end
  end
end

# frozen_string_literal: true

module Types
  class AccountType < Types::BaseObject
    def self.authorized?(object, context)
      object.users.include?(context[:current_user])
    end

    description "An account in the application"

    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :name, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :account_users, [ Types::AccountUserType ], null: false
  end
end

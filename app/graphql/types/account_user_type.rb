# frozen_string_literal: true

module Types
  class AccountUserType < Types::BaseObject
    description "A relationship between an account and a user"

    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :role, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :user, Types::UserType, null: false
    field :account, Types::AccountType, null: false
  end
end

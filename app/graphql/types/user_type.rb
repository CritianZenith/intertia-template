# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    description "A user of the application"

    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :email_address, String, null: false

    field :account_users, [ Types::AccountUserType ], null: false
  end
end

# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Used by Relay to lookup objects by UUID:
    include GraphQL::Types::Relay::HasNodeField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :accounts, Types::AccountType.connection_type, null: true, description: "Returns a list of accounts"
    def accounts
      context[:current_user]&.accounts
    end

    field :current_account, Types::AccountType, null: true, description: "Returns the currently selected account"
    def current_account
      context[:current_account]
    end

    field :me, Types::UserType, null: true, description: "Returns the currently logged in user"
    def me
      context[:current_user]
    end
  end
end

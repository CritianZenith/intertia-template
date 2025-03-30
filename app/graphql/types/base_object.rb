# frozen_string_literal: true

module Types
  class BaseObject < GraphQL::Schema::Object
    edge_type_class(Types::BaseEdge)
    connection_type_class(Types::BaseConnection)
    field_class Types::BaseField

    def self.authorized?(object, context)
      if object.respond_to?(:account)
        object.account == (context[:current_account])
      elsif object.respond_to?(:user)
        object.user == context[:current_user]
      elsif object.respond_to?(:users)
        object.users.include?(context[:current_user])
      else
        true
      end
    end
  end
end

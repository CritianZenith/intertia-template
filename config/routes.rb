Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  # Main API
  post "/graphql", to: "graphql#execute"

  # Main Web App
  resources :accounts, only: [ :new, :create ]

  # Authentication
  resource :session do
    get "select_account/:account_id", to: "sessions#select_account"
  end
  get "/session/destroy", to: "sessions#destroy"
  resources :passwords, param: :token
  resource :profile, only: [ :show, :edit, :update ]

  # Settings
  get "/settings", to: "settings#show"
  get "/settings/edit", to: "settings#edit", as: "edit_settings"
  patch "/settings", to: "settings#update"
  get "/settings/users/new", to: "settings/users#new", as: "new_settings_user"
  post "/settings/users", to: "settings/users#create", as: "settings_users"
  patch "/settings/users/:id", to: "settings/users#update", as: "settings_user"
  delete "/settings/users/:id", to: "settings/users#destroy"

  # Inertia Example
  get "inertia-example", to: "inertia_example#index"
  get "/privacy", to: "home#privacy"
  get "/terms", to: "home#terms"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root to: "dashboard#index"
end

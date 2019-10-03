Rails.application.routes.draw do
  devise_for :users
  root to: "messages#index"
  get 'messages/index'
end

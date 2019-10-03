Rails.application.routes.draw do
  get 'users/edit'

  devise_for :users
  root to: "messages#index"
  resources :users, only:[:edit, :update]
end

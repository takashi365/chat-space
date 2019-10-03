Rails.application.routes.draw do
  get 'users/edit'

  devise_for :users
  root to: "messages#index"
  resources :users, only:[:edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end

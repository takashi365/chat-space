class UsersController < ApplicationController
  def index
    @users = query.order(:id)
    respond_to do |format|
      format.json { 
        render json: { id: @user.id, name: @user.name }
      }
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def query
    if params[:user].present? && params[:user][:name]
      User.where('name LIKE ?', "%#{params[:user][:name]}%")
    else
      User.all
    end
  end

end

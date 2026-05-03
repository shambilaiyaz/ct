class HomeController < ApplicationController
  def index
    if params[:from_login] == 'true'
      render :index
    else
      redirect_to root_path
    end
  end

  def login
  end

  def inter_type
    render 'home/inter_type'
  end
end

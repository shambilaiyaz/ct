class UserEmailsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  # POST /user_emails
  def create
    @user_email = UserEmail.new(user_email_params)
    # Use the username from the form, or fall back to session
    @user_email.username ||= session[:ct_username] || 'anonymous'

    if @user_email.save
      respond_to do |format|
        format.html do
          redirect_back fallback_location: root_path, notice: "Email saved! 🐾 thanks #{@user_email.username}!"
        end
        format.json { render json: { message: 'Email saved! 🐾', email: @user_email.email }, status: :created }
      end
    else
      respond_to do |format|
        format.html { redirect_back fallback_location: root_path, alert: @user_email.errors.full_messages.first }
        format.json { render json: { errors: @user_email.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  private

  def user_email_params
    params.require(:user_email).permit(:email, :username)
  end
end

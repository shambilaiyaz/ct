class FeedbacksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    @feedback = Feedback.new(feedback_params)
    @feedback.username ||= session[:ct_username] || 'anonymous'

    if @feedback.save
      respond_to do |format|
        format.html do
          redirect_back fallback_location: root_path, notice: 'Feedback saved! 🐾'
        end
        format.json { render json: { message: 'Feedback saved! 🐾' }, status: :created }
      end
    else
      respond_to do |format|
        format.html { redirect_back fallback_location: root_path, alert: @feedback.errors.full_messages.first }
        format.json { render json: { errors: @feedback.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit(:text, :username)
  end
end

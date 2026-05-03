class ComplaintsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create destroy clear]

  # GET /complaints
  def index
    complaints = Complaint.order(created_at: :desc)
    render json: complaints.map { |c|
      {
        id: c.id,
        user: c.user,
        text: c.text,
        date: c.date,
        time: c.time
      }
    }
  end

  # POST /complaints
  def create
    @complaint = Complaint.new(complaint_params)
    @complaint.user ||= 'anonymous'

    if @complaint.save
      render json: {
        message: "Complaint filed! 🐾 we'll look into it, #{@complaint.user}!",
        complaint: {
          id: @complaint.id,
          user: @complaint.user,
          text: @complaint.text,
          date: @complaint.date,
          time: @complaint.time
        }
      }, status: :created
    else
      render json: { errors: @complaint.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /complaints/:id
  def destroy
    @complaint = Complaint.find_by(id: params[:id])
    if @complaint
      @complaint.destroy
      render json: { message: 'Complaint dismissed! 🐾' }
    else
      render json: { errors: ['Complaint not found'] }, status: :not_found
    end
  end

  # DELETE /complaints/clear
  def clear
    password = request.headers['X-Complaint-Password'] || params[:password]
    if password != '@sqwerty'
      render json: { errors: ['Wrong password! Complaints not cleared.'] }, status: :unauthorized
      return
    end
    count = Complaint.count
    Complaint.destroy_all
    render json: { message: "Cleared #{count} complaint#{count != 1 ? 's' : ''}! 🐾" }
  end

  private

  def complaint_params
    params.require(:complaint).permit(:user, :text, :date, :time)
  end
end

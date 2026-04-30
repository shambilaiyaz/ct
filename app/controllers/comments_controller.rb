class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy, :clear]

  # GET /comments
  def index
    comments = Comment.order(created_at: :desc)
    render json: comments.map { |c|
      {
        id: c.id,
        user: c.user,
        text: c.text,
        date: c.date,
        time: c.time
      }
    }
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)
    @comment.user ||= "anonymous"

    if @comment.save
      render json: {
        message: "Comment saved! 🐾 thanks #{@comment.user}!",
        comment: {
          id: @comment.id,
          user: @comment.user,
          text: @comment.text,
          date: @comment.date,
          time: @comment.time
        }
      }, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /comments/:id
  def destroy
    @comment = Comment.find_by(id: params[:id])
    if @comment
      @comment.destroy
      render json: { message: "Comment deleted! 🐾" }
    else
      render json: { errors: ["Comment not found"] }, status: :not_found
    end
  end

  # DELETE /comments (clear all)
  def clear
    count = Comment.count
    Comment.destroy_all
    render json: { message: "Cleared #{count} comment#{count != 1 ? 's' : ''}! 🐾" }
  end

  private

  def comment_params
    params.require(:comment).permit(:user, :text, :date, :time)
  end
end

class UserEmail < ApplicationRecord
  validates :email, presence: true, uniqueness: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP, message: 'please enter a valid email' }
  validates :username, presence: true
end

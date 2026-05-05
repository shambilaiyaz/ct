class Feedback < ApplicationRecord
  validates :text, presence: true
  validates :username, presence: true
end

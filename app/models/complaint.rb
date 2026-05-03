class Complaint < ApplicationRecord
  validates :user, presence: true
  validates :text, presence: true, length: { maximum: 500 }
end

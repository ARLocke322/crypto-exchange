class User < ApplicationRecord
  has_secure_password 

  validates :email, presence: true, 
    uniqueness: true,
    format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :username, presence: true, 
    uniqueness: true,
    length: { minimum: 3, maximum: 20 }

  validates :password, length: { minimum: 6 }, if: :password_required?

  private 
  
  def password_required?
    new_record? || password.present?
  end
end

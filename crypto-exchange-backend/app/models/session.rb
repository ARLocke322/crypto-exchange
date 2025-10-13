
class Session < ApplicationRecord
  belongs_to :user

  before_create :set_token_and_expiry

  scope :active, -> { where('expires_at > ?', Time.current).where(revoked_at: nil) }

  def set_token_and_expiry
    self.token = SecureRandom.hex(32)
    self.expires_at = 1.hour.from_now
  end
end

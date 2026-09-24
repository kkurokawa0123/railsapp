class Todo < ApplicationRecord
  belongs_to :user

  scope :active,  -> { where( is_deleted: 0 ) } 
  scope :trashed, -> { where( is_trashed: 1 ) }

  def self.mark_as_deleted
      trashed.update_all(is_deleted: 1)
  end
end

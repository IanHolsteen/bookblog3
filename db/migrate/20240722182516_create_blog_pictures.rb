class CreateBlogPictures < ActiveRecord::Migration[7.1]
  def change
    create_table :blog_pictures do |t|
      t.string :image
      t.text :description
      t.references :blog_content, null: false, foreign_key: true

      t.timestamps
    end
  end
end

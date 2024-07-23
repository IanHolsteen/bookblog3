class CreateBlogContents < ActiveRecord::Migration[7.1]
  def change
    create_table :blog_contents do |t|
      t.string :title
      t.text :body
      t.datetime :publication_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

puts 'Starting to seed database...'

puts 'Destroying existing users and blog contents...'
User.destroy_all
BlogContent.destroy_all

puts 'Seeding users...'
user = User.create!(name: "Test User", email: "test@example.com", password: "password")

puts 'Seeding blog content...'
BlogContent.create!(title: "Test Post", body: "This is a test post.", user: user)

puts 'Seeded successfully!'
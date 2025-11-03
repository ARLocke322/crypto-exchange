require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save without email" do
    user = User.new(username: "testusername", password: "testpassword")
    assert_not user.save, "Saved user without email"
  end

  test "should not save with invalid email format" do
    user = User.new(email: "bademail", username: "testusername", password: "testpassword")
    assert_not user.save, "Saved user with invalid email"
  end

  test "should not save without username" do 
    user = User.new(email:"testemail@test.com", password:"testpassword")
    assert_not user.save, "Saved user without username"
  end

  test "should not save without password" do 
    user = User.new(email:"testemail@test.com", username:"testusername")
    assert_not user.save, "Saved user without password"
  end
  
  test "should not save with username < 4 characters" do
    user = User.new(email:"testemail@test.com", username:"ab", password:"testpassword")
    assert_not user.save, "Saved user with < 3 character username"
  end

  test "should not save with username with > 20 characters" do
    user = User.new(email:"testemail@test.com", username:"abcdefghijklmnopqrstuvwxyz", password:"testpassword")
    assert_not user.save, "Saved user with > 20 character username"
  end
  
  test "should not save with password < 6 characters" do
    user = User.new(email:"testemail@test.com", username:"testusername", password:"short")
    assert_not user.save, "Saved user with < 6 character password"
  end

  test "should save with valid credentials" do
    user = User.new(email:"testemail@test.com", username:"testusername", password:"testpassword")
    assert user.save, "Valid user did not save"
  end

  test "should not save if username already exists" do
    user1 = User.new(email:"testemail1@test.com", username:"testusername", password:"testpassword")
    user2 = User.new(email:"testemail2@test.com", username:"testusername", password:"testpassword")
    user1.save
    assert_not user2.save, "Saved user with duplicate username"
  end

  test "should not save if email already exists" do
    user1 = User.new(email:"testemail@test.com", username:"testusername1", password:"testpassword")
    user2 = User.new(email:"testemail@test.com", username:"testusername2", password:"testpassword")
    user1.save
    assert_not user2.save, "Saved user with duplicate email"
  end

  test "calling authenticate with the correct password returns true and false otherwise" do
    user = User.new(email:"testemail@test.com", username:"testusername", password:"testpassword")
    user.save
    assert user.authenticate("testpassword"), "Correct password returned false"
    assert_not user.authenticate("wrongpassword"), "Wrong password returned true"
  end
end

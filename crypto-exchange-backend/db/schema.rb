# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_29_113933) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "cryptocurrencies", force: :cascade do |t|
    t.string "name"
    t.string "abbreviation"
    t.string "image"
  end

  create_table "cryptocurrency_holdings", force: :cascade do |t|
    t.bigint "wallet_id", null: false
    t.bigint "cryptocurrency_id", null: false
    t.decimal "amount", precision: 20, scale: 8
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cryptocurrency_id"], name: "index_cryptocurrency_holdings_on_cryptocurrency_id"
    t.index ["wallet_id"], name: "index_cryptocurrency_holdings_on_wallet_id"
  end

  create_table "cryptocurrency_prices", force: :cascade do |t|
    t.bigint "cryptocurrency_id", null: false
    t.decimal "price_usd"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "market_cap_usd", precision: 20, scale: 2
    t.decimal "total_volume_usd", precision: 20, scale: 2
    t.index ["cryptocurrency_id", "created_at"], name: "idx_on_cryptocurrency_id_created_at_ce2b5a11f8", order: { created_at: :desc }
    t.index ["cryptocurrency_id"], name: "index_cryptocurrency_prices_on_cryptocurrency_id"
  end

  create_table "cryptocurrency_transactions", force: :cascade do |t|
    t.bigint "wallet_id", null: false
    t.bigint "cryptocurrency_id", null: false
    t.integer "transaction_type", null: false
    t.decimal "crypto_amount", precision: 20, scale: 8, null: false
    t.decimal "price_per_unit", precision: 15, scale: 2, null: false
    t.decimal "usd_amount", precision: 15, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cryptocurrency_id"], name: "index_cryptocurrency_transactions_on_cryptocurrency_id"
    t.index ["wallet_id", "created_at"], name: "index_cryptocurrency_transactions_on_wallet_id_and_created_at"
    t.index ["wallet_id"], name: "index_cryptocurrency_transactions_on_wallet_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "token", null: false
    t.datetime "expires_at", null: false
    t.datetime "revoked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_sessions_on_token", unique: true
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "username", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "wallets", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "usd_amount", precision: 15, scale: 2
    t.index ["user_id"], name: "index_wallets_on_user_id"
  end

  add_foreign_key "cryptocurrency_holdings", "cryptocurrencies"
  add_foreign_key "cryptocurrency_holdings", "wallets"
  add_foreign_key "cryptocurrency_prices", "cryptocurrencies"
  add_foreign_key "cryptocurrency_transactions", "cryptocurrencies"
  add_foreign_key "cryptocurrency_transactions", "wallets"
  add_foreign_key "sessions", "users"
  add_foreign_key "wallets", "users"
end

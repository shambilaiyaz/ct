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

ActiveRecord::Schema[8.1].define(version: 2026_05_05_115400) do
  create_table "comments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "date"
    t.text "text"
    t.string "time"
    t.datetime "updated_at", null: false
    t.string "user"
  end

  create_table "complaints", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "date"
    t.text "text"
    t.string "time"
    t.datetime "updated_at", null: false
    t.string "user"
  end

  create_table "feedbacks", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "text"
    t.datetime "updated_at", null: false
    t.string "username"
  end

  create_table "pending_verifications", force: :cascade do |t|
    t.string "confirmation_token", null: false
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.index ["confirmation_token"], name: "index_pending_verifications_on_confirmation_token", unique: true
    t.index ["email"], name: "index_pending_verifications_on_email"
  end

  create_table "user_emails", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.datetime "updated_at", null: false
    t.string "username"
  end
end

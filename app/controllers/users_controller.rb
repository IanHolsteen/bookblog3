class UsersController < ApplicationController
    skip_before_action :guest, only: [:create, :show, :index, :update, :destroy]
    skip_before_action :authorize, only: [:create, :guest, :show, :index]
    before_action :find_user, only: [:update, :destroy]

    def index
        render json: User.all
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            @guest = User.new(email: "Guest")
            @guest.save(validate: false)
            session[:user_id] = @guest.id
            render json: @guest
        end
    end

    def guest
        return if session[:user_id]
        @guest = User.new(:email => "Guest")
        @guest.save(validate: false)
        session[:user_id] = @guest.id
    end

    def create
        user = User.create!(user_params)
        guest_user = User.where(email: "Guest").order(created_at: :desc).first
        if guest_user
            guest_user.destroy
        end
        session[:user_id] = user.id
        render json: user, status: :created
    end


    def update
        @user.update!(user_params)
        render json: @user, status: :accepted
    end

    def destroy
        @user.destroy
        head :no_content
    end

    private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:email, :password, :password_confirmation, :user)
    end
end

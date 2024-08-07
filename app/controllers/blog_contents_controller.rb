class BlogContentsController < ApplicationController
    skip_before_action :authorize, only: [:show, :index]

    def index
        render json: BlogContent.all
    end

    def show
        render json: @blog
    end

end

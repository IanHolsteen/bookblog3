class BlogContentsController < ApplicationController
    # skip_before_action :authorize, only: [:show, :update, :destroy, :index]

    def index
        render json: BlogContent.all
    end
end

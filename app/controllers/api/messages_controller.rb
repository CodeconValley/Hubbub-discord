class Api::MessagesController < ApplicationController
  before_action :require_login

  def index
    @messages = current_channel.messages
    render :index
  end

  def show
    @message = Message.find(params[:id])
  end

  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if params[:serverId] == "@me"
      @message.messageable = DirectMessage.find(params[:channelId])
    else
      @message.messageable = Channel.find(params[:channelId])
    end

    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 400
    end
  end

  def update
    @message = Message.find(params[:id])
  end

  def destroy
  end

  def message_params
    params.require(:message).permit(:body)
  end

  def current_channel
    if params[:serverId] == "@me"
      @current_channel = DirectMessage.find(params[:channelId])
    else
      @current_channel = Channel.find(params[:channelId])
    end
  end
end

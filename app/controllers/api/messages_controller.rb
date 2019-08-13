class Api::MessagesController < ApplicationController
  def index
    @messages = Message.includes(:user).where('id > ?', params[:id]).where(group_id: params[:group_id])
  end
  
end

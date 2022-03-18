class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # ブロードキャスト用のストリーム名を設定
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak
    # クライアントがメッセージを送信した時に実行される処理
    message = Message.create!(content: data["message"])
    ActionCable.server.broadcast(
      "room_channel", { message: render_message(message) }
    )
  end

  private

  def render_message
    ApplicationController.render(
      partial: "messages/message",
      locals: { message: message }
    )
  end
end

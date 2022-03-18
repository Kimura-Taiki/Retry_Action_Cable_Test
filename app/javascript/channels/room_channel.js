import consumer from "./consumer"

consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    document,
      querySelector('input[data-behavior="room_speaker"]'),
      addEventListener('keypress', (event) => { // メッセージが入力された時にイベント発火
        if (event.key === 'Enter') { // Enterキーを押下時、speakメソッドを呼び出す
          this.speak(event.target.value);
          event.target.value = '';
          return event.preventDefault();
        }
      });
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    // 受け取ったメッセージをHTML上に追加
    const element = document.querySelector('#messages')
    element.insertAdjacentHTML('beforeend', data['message'])

  },

  speak: function() {
    return this.perform('speak');
  }
});


var socket = io();
socket.emit('join', name);

// TODO: Cause the event joining message on the reception of a name

// if form is submitted, cause a chat message event
$('form').submit(function(e) {
    // will prevent page reloading
    e.preventDefault();

    // TODO: sending the name of the writer with the value of the form as a chat message
    socket.emit('message', name + ': ' + $('#m').val());

    // Add a list item with what you say on your screen
    $('#messages').append($('<li id="list">').text('You:  ' + $('#m').val()));

    // blank out the send message bar to have another message come in
        $('#m').val('');

    // have to return a boolean value
    return false;
});
socket.on('message', (msg) => {
    $('#messages').append($('<li>').text(msg));
});
// TODO: if a chat message event happens ("comes in"), take that message and add it to the displayed messages
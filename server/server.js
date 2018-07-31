Messages.allow({
  remove: function(userId, doc) {
    return App.canDeleteMessage(doc.username);
  }
});

Meteor.publish('messages', function(limit) {
  check(limit, Match.Optional(Number));
  if (this.userId) {
    return Messages.find({
      chatRoomId: undefined
    }, {
      limit: limit || 5,
      sort: { timestamp: -1 }
    });
  }
  this.ready();
});

Meteor.publish('chatRoomMessages', function(chatRoomId) {
  check(chatRoomId, String);
  return Messages.find({
    chatRoomId: chatRoomId
  }, {
    limit: 20
  });
});

Meteor.publish('userMessages', function(username) {
  check(username, String);
  return Messages.find({
    username: username
  });
});

Meteor.publish('chatRoom', function(id) {
  check(id, String);
  return ChatRooms.find({
    _id: id
  });
});

Meteor.publish('chatRooms', function() {
  return ChatRooms.find();
});

Meteor.publish("userRooms",function(){
  return UserRooms.find({});
});
Meteor.publish("onlusers",function(){
  return Meteor.users.find({"status.online":true},{username:1});
})

Meteor.startup(function() {
  var shubham = Meteor.users.findOne({ username: 'shubham' });
  if (shubham) {
    Roles.addUsersToRoles(shubham._id, ['admin'], 'all');
  }

  UserRooms.allow({
    'insert':function(userId,doc){
        return true;
    },
    'update':function(userId,doc,fieldNames, modifier){
        return true;
    },
    'remove':function(userId,doc){
        return false;
    }
});
});

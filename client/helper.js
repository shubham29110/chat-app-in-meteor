Template.registerHelper("canDeleteChatroom",function(chatroomUsername){
    Meteor.subscribe('chatRooms');
    return chatroomUsername == Meteor.user().username ||
    Roles.userIsInRole(Meteor.userId(), 'admin', 'all');
  })

  Template.registerHelper('formatDate', function(timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleString();
  });


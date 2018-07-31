Template.registerHelper("canDeleteChatroom",function(chatroomUsername){
    Meteor.subscribe('chatRooms');
    return chatroomUsername == Meteor.user().username ||
    Roles.userIsInRole(Meteor.userId(), 'admin', 'all');
  })



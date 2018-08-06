Template.chatRooms.events({
    'click .delete-chatRoom': function(evt, tpl) {
        evt.preventDefault();
        Meteor.call("deleteChatRoom",this._id)
      }
})
Template.chatbox.helpers({
    inOrOut:function(userid){
        console.log("uerid")
        if(userid==Meteor.userId()){
        return true
        }else{
            return false
        }
    },

    chatList:function(){
        return Messages.find({}, { sort: { timestamp: -1 }}).fetch()
    },
    canDelete: function() {
      return App.canDeleteMessage(this.username);
    }
})


Template.chatbox.events({
    'submit #chaat-form': function(e) {
      e.preventDefault();
      var form = e.target;
      var data = {
        message: form.message.value,
        chatRoomId: Router.current().params._id
      };
      form.message.value = '';
      Meteor.call('addMessage', data, function(err, result) {
        if (err) {
          alert(err.reason);
          form.message.value = message;
        } else {
          form.reset();
          console.log('result: ', result);
        }
      });
    },
    'click .click-me': function(evt, tpl) {
      console.log(this);
    },
    'click .delete-msg': function(evt, tpl) {
      Messages.remove(this._id);
    }
  });
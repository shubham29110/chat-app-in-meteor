
Template.popupbox.helpers({
    msgs:function(){
        var result=UserRooms.findOne({_id:Session.get('roomid')});
       
        if(result){
            //result.userId = result.chatIds[1];
          return result.messages;
        }
    },
    userName:function(){
        var result= UserRooms.findOne({_id:Session.get('roomid')})
        if(result){
            var uid= result.chatIds[0];
            if(uid==Meteor.userId()){
                uid = result.chatIds[1]
               
            }
            return Meteor.users.findOne({_id:uid}).username
        }
    },
    inOrOut:function(userid){
        
        if(userid==Meteor.userId()){
        return true
        }else{
            return false
        }
    },
   
});


Template.popupbox.events = {
    'keydown #messagea' : function (event) {

      if (event.which == 13) { 
        
          if (Meteor.user())
          {
                var name = Meteor.user().username;
                var message = document.getElementById('messagea');
      
                if (message.value !== '') {
                  var de=UserRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
                    user_id:Meteor.userId(),
                   name: name,
                   text: message.value,
                   createdAt: Date.now()
                  }}});
                  document.getElementById('messagea').value = '';
                  message.value = '';
                }
          }
          else
          {
             alert("login to chat");
          }
         
      }
    }
  }
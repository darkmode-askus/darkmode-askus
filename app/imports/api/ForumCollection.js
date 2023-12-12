import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Meteor } from 'meteor/meteor';

const ForumCollection = new Mongo.Collection("forum");

const commentSchema = new SimpleSchema({
  source: { type: String },
  comment: { type: String },
})

const ForumSchema = new SimpleSchema({
  source: { type: String },
  title: { type: String },
  description: { type: String },
  comments: {type: Array},
  "comments.$": {
    type: commentSchema,
  },
});

ForumCollection.attachSchema(ForumSchema);

const addForum = (title, description) => {
  const username = Meteor.call("getUsername");
  console.log(username);
  // Exit function if username is null
  if (!username) {
    return;
  }

  const forum = {
    source: username,
    title: title,
    description: description,
    comments: [],
  };

  ForumCollection.insert(forum);
};

const removeForum = (id) => {
  const forum = ForumCollection.findOne({"_id": id});

  // exit function if the current user is not the owner of the forum post or admin
  if (forum.source !== Meteor.call("getUsername") && Meteor.call("isAdmin") == false) {
    return;
  }

  ForumCollection.remove(id);
};

// users.update({_id : "Jack"},{$set:{age : 13, username : "Jack"}});

const editForum = async (forum, title, description) => {
  // exit function if the current user is not the owner of the forum post
  if (forum.source !== Meteor.call("getUsername")) {
    return;
  }
  ForumCollection.update({_id: forum._id}, {$set: {title: title, description: description}})
};

const addForumComment = (forum, comment) => {
  let username = Meteor.call("getUsername")
  if (username === "") {
    username = "Anonymous"
  }

  ForumCollection.update({_id: forum._id}, {$push: {comments: {source: username, comment: comment}}})
}

export { ForumCollection, ForumSchema, addForum, removeForum, editForum, addForumComment };

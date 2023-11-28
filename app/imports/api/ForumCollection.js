import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const ForumCollection = new Mongo.Collection("forum");

const ForumSchema = new SimpleSchema({
  source: { type: String },
  title: { type: String },
  description: { type: String },
});

ForumCollection.attachSchema(ForumSchema);

const addForum = (title, description) => {
  const username = Meteor.call("getUsername");

  // Exit function if username is null
  if (!username) {
    return;
  }

  const forum = {
    source: username,
    title: title,
    description: description,
  };

  ForumCollection.insert(forum);
};

const removeForum = (id) => {
  const forum = ForumCollection.findOne({"_id": id});

  // exit function if the current user is not the owner of the forum post
  if (forum.source !== Meteor.call("getUsername")) {
    return;
  }

  ForumCollection.remove(id);
};

// Will add edit functionality later
// const editForum = async (id, title, description) => {
//   // exit function if the current user is not the owner of the forum post
//   if (forum.source !== Meteor.call("getUsername")) {
//     return;
//   }
//
//   removeForum(id);
//   addForum(title, description);
//
// };

export { ForumCollection, ForumSchema, addForum, removeForum };
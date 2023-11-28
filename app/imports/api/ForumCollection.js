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
  const forum = {
    source: Meteor.call("getUsername"),
    title: title,
    description: description,
  };

  ForumCollection.insert(forum);
};

const removeForum = (id) => {
  if (!Meteor.call("isAdmin") || !Meteor.call(id)) {
    return;
  }

  ForumCollection.remove(id);
};

const editForum = async (id, title, description) => {
  if (!Meteor.call("isAdmin") || !Meteor.call(id)) {
    return;
  }

  removeForum(id);
  addForum(title, description);

};

export { ForumCollection, ForumSchema, addForum, removeForum, editForum};
const db = require('./db')
const Query = {
   //resolver function  with no parameters and returning string
   greeting: () => {
      return "hello from Sample Code !!!"
   },
   //resolver function with no parameters and returning list
   students: () => db.students.list(),

   //resolver function with arguments and returning object
   //resolver function for studentbyId
   studentById: (root, args, context, info) => {
      //args will contain parameter passed in query
      return db.students.get(args.id);
   }
}

//for each single student object returned,resolver is invoked
const Student = {
   fullName: (root, args, context, info) => {
      return root.firstName + ":" + root.lastName
   }
}

module.exports = { Query, Student }
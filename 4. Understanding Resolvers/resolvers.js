const db = require('./db')
const Query = {
   //resolver function  with no parameters and returning string
   greeting: () => {
      return "hello from Sample Code !!!"
   },
   //resolver function with no parameters and returning list
   students: () => db.students.list(),

   //resolver function with arguments and returning object
   studentById: (root, args, context, info) => {
      return db.students.get(args.id);
   }
}

module.exports = { Query }
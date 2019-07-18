const db = require('./db');

const Query = {
	greeting: () => 'hello',

	studentById: (root, args, context, info) => {
		return db.students.get(args.id);
	}
};

const Mutation = {
	createStudent: (root, args, context, info) => {
		return db.students.create({
			collegeId: args.collegeId,
			firstName: args.firstName,
			lastName: args.lastName
		});
	}
};

module.exports = { Query, Mutation };

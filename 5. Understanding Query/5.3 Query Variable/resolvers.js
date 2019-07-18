
const Query = {
	
	//resolver function with arguments and returning object
	//resolver function for studentbyId
	sayHello: (root, args, context, info) => `Hi ${args.name} GraphQL server says Hello to you!!`
};


module.exports = { Query };

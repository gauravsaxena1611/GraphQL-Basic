const Query = {
	/** resolver function  with no parameters and returning string */
	greeting: () => 'Hello GraphQL  From TutorialsPoint !!',

	/** resolver function with arguments and returning object */
	sayHello: (root, args, context, info) => `Hi ${args.name} GraphQL server says Hello to you!!`
};

module.exports = { Query };

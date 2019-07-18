const Query = {
	//resolver function with arguments and returning object
	/** The resolver function setFavouriteColor takes root and args. 
	 *  The enum value passed to function at runtime can be accessed 
	 *  through args parameter. */

	setFavouriteColor: (root, args) => {
		return 'Your Fav Color is :' + args.color;
	}
};

module.exports = { Query };

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');
var path = require('path');
/** This code uses two modules − jsonwebtoken and express-jwt to authenticate requests */
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

var port = process.env.PORT || 9000;
/** private key */
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const app = express();

const fs = require('fs');
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
	cors(),
	bodyParser.json(),
	/** decodes the JWT and stores in request object */
	expressJwt({
		secret: jwtSecret,
		credentialsRequired: false
	})
);

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');

/** Make req.user available to GraphQL context */
app.use( '/graphql', graphqlExpress((req) => ({
		schema,
		context: { user: req.user && db.students.get(req.user.sub) }
	}))
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

/** authenticate students */
app.post('/login', (req, res) => {
	const { email, password } = req.body;
	/** Traditional approach */
	/** const email = req.body.email;
     *  const password = req.body.password; */

	/** check database */
	const user = db.students.list().find((user) => user.email === email);
	if (!(user && user.password === password)) {
		res.sendStatus(401);
		return;
	}

	/** generate a token based on private key, token doesn't have an expiry */
	const token = jwt.sign({ sub: user.id }, jwtSecret);
	res.send({ token });
});

/** For calling  Index.html at http://localhost:9000  */
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.info(`Server Started on port ${port} !!!`));

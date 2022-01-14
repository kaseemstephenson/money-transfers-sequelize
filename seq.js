const { Sequelize, DataTypes } = require('sequelize')
class Seq{
	constructor(x){
		this.name = x;
		this.db = "";
		this.username = "";
		this.password = "";
		this.host = "";
	}
	displays(){
		return this.name
	}


	async checkConnection(credentials){
		var status = true;
		const sequelize = new Sequelize(
    { // use imported configurations from dbConfig
        database: credentials.db,
        username: credentials.username,
        password: credentials.password,
        dialect: "postgres",
        host: credentials.host,
        pool: {
     		max: 5000,
     		min: 0,
      		acquire: 30000,
      		idle: 10000
   		},
    })
	try {
		await sequelize.authenticate();
		sequelize.close()
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:');
		status =  false;
	}
	if(status == true){
		this.db = credentials.db;
		this.username = credentials.username;
		this.password = credentials.password;
		this.host = credentials.host

	}
	console.log("ZZZZ",this.db)
	console.log("STATUS: ",status)
	return status	
}

async makeWithdraw(credentials){
		var status = true;
		const sequelize = new Sequelize(
    { // use imported configurations from dbConfig
        database: this.db,
        username: this.username,
        password: this.password,
        dialect: "postgres",
        host: this.host,
        pool: {
     		max: 5,
     		min: 0,
      		acquire: 30000,
      		idle: 10000
   		},
    })
	try {
		
sequelize.authenticate().then(() => {
  console.log("Success!");
  const Accounts = sequelize.define('accounts', {
    accountName: {
      type: Sequelize.STRING
    },
    accountNumber: {
      type: Sequelize.STRING
    },
    routingNumber: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });
  const Users = sequelize.define('users', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zipCode: {
      type: Sequelize.STRING
    },
    funds:{
    	type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });
  
  
  Users.hasMany(Accounts,{as:"accounts"})
  Accounts.belongsTo(Users,{foreignKey:"userId",as:"user"})
  Users.sync({force: false}).then(function () {});


  Accounts.sync({force: false}).then(function () {Accounts.findAll({}).then((data) => {
    console.log(data);
 }).catch((err) => {
    console.log(err);
 });});
}).catch((err) => {
        console.log("error was made")
  console.log(err);
});
		} catch (error) {
			console.error('Unable to connect to the database:');
			status =  false;
		}
	console.log("STATUS: ",status)
	return status	
}
async populateDataWorld(credentials){
		var status = true;
		const sequelize = new Sequelize(
    { // use imported configurations from dbConfig
        database: credentials.db,
        username: credentials.username,
        password: credentials.password,
        dialect: "postgres",
        host: credentials.host,
        pool: {
     		max: 5000,
     		min: 0,
      		acquire: 30000,
      		idle: 10000
   		},
    })
	try {
		
sequelize.authenticate().then(() => {
  console.log("Success!");
  const Accounts = sequelize.define('accounts', {
    accountName: {
      type: Sequelize.STRING
    },
    accountNumber: {
      type: Sequelize.STRING
    },
    routingNumber: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });
  const Users = sequelize.define('users', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zipCode: {
      type: Sequelize.STRING
    },
    funds:{
    	type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });
  
  
  Users.hasMany(Accounts,{as:"accounts"})
  Accounts.belongsTo(Users,{foreignKey:"userId",as:"user"})
  Users.sync({force: true}).then(function () {
    	 Users.create({
      firstName: 'Kaseem',
      lastName: 'Stephenson',
      email:'kstephenson@talentpath.com',
      phoneNumber:"2722198230",
      password:"password",
      address:"2312 clear drive",
      city:"Atlanta",
      state:"WI",
      zipCode:"18610",
      funds:"1000"
    });
    Users.create({
      firstName: 'NOT Kaseem',
      lastName: 'Stephenson',
      email:'kstephenson@talentpath.com',
      phoneNumber:"2722198230",
      password:"password",
      address:"2312 clear drive",
      city:"Atlanta",
      state:"WI",
      zipCode:"18610",
      funds:"1000"
    });
  });


  Accounts.sync({force: true}).then(function () {
       Accounts.create({
      accountName: 'PNC',
      accountNumber: '23454541134',
      routingNumber:'002030',
      userId:1
    });
    Accounts.create({
      accountName: 'bank of america',
      accountNumber: '23454541134',
      routingNumber:'002030',
      userId:2
    });
  });
}).catch((err) => {
        console.log("error was made")
  console.log(err);
});
		} catch (error) {
			console.error('Unable to connect to the database:');
			status =  false;
		}
		console.log("STATUS: ",status)
		
	return status	
}








	seq(){
		const sequelize = new Sequelize(
    { // use imported configurations from dbConfig
        database: "users",
        username: "postgresks",
        password: "hades9230",
        dialect: "postgres",
        host: "database-kaseem-testing.c8iyljikzvmc.us-east-1.rds.amazonaws.com",
    })

// authenticate will test the connection with DB and return a promise
sequelize.authenticate()
    .then(() => { // successfully connected to DB
        console.log("connected to Postgres DB")
    })
    .catch(e => {// failed connecting to DB
        console.log('unable to connect to Postgres DB' + e)
    })
sequelize.authenticate().then(() => {
  console.log("Success!");
  var Users = sequelize.define('users', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zipCode: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  Users.sync({force: false}).then(function () {
    return Posts.create({
      title: 'Test From class',
      content: 'Hello there'
    });
  });
  
  Users.findAll({
  where: {
    id: '100'
  }
 }).then((data) => {
    console.log(data);222
 }).catch((err) => {
    console.log(err);
 });
}).catch((err) => {
        console.log("error was made")
  console.log(err);
});

}











	}

/*
function seq(){
	const sequelize = new Sequelize(
    { // use imported configurations from dbConfig
        database: "users",
        username: "postgresks",
        password: "hades9230",
        dialect: "postgres",
        host: "database-kaseem-testing.c8iyljikzvmc.us-east-1.rds.amazonaws.com",
    })

// authenticate will test the connection with DB and return a promise
sequelize.authenticate()
    .then(() => { // successfully connected to DB
        console.log("connected to Postgres DB")
    })
    .catch(e => {// failed connecting to DB
        console.log('unable to connect to Postgres DB' + e)
    })
sequelize.authenticate().then(() => {
  console.log("Success!");
  var Posts = sequelize.define('posts', {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  Posts.sync({force: false}).then(function () {
    return Posts.create({
      title: 'edoedk',
      content: 'Hello there'
    });
  });
  
  Posts.findAll({
  where: {
    id: '100'
  }
 }).then((data) => {
    console.log(data);222
 }).catch((err) => {
    console.log(err);
 });
}).catch((err) => {
        console.log("error was made")
  console.log(err);
});
	console.log("in testing on seq.js")
}
*/
module.exports = Seq;
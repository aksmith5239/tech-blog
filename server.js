const express = require('express');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const sequelize = require('./config/connection');
const session = require('express-session');
// const cookieSession = require('cookie-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// app.use(express.cookieParser());


// const sess = cookieSession({
//     secret: process.env.SECRET,
//     resave: false,
//     cookie: {
//         secureProxy: true,
//         httpOnly: true,
//         domain: "https://my-tech-blog-2020.herokuapp.com/",
//         expires: expiryDate
//     }
// })

const sess = {
    secret: 'secretsauce',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));

app.use(routes);



sequelize.sync({force: true}).then(() => {
    app.listen(PORT, ()=> console.log(`Now Listening on port ${PORT}!`));
})

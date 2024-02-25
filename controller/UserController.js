const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    indexRegister: async (req, res) => {
        const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
        const alert = {
            message: alertMsg,
            status: alertStatus
        };
        res.locals.title = 'Register Account Admin';
        res.render('pages/register',{alert});
    },
    indexLogin: async (req, res) => {
        try{
            const alertMsg = req.flash('alertMsg');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMsg,
                status: alertStatus
            };
            res.render('pages/login',{alert , title: 'Login Account'
            });
        } catch(error){
            res.render('pages/login');
        }
    },
    indexDashboard: async (req, res) => {

    },
    index: async (req,res) => {
        res.locals.title = 'Master Data | User';
        res.locals.currentPage = 'user';
        const user = await User.find();
        const alertMsg = req.flash('alertMsg');
        const alertStatus = req.flash('alertStatus');
        const alert = {
            message: alertMsg,
            status: alertStatus
        };
        res.render('pages/user', {user, alert});
    },
    
    store: async (req, res) => {
        try{
            const {fullName, phone, email, password, username} = req.body;
            await User.create({fullName, phone, email, password, username});
            req.flash('alertMsg', 'Done, your account has been created. Please go to page Login !');
            req.flash('alertStatus', 'success');
            res.redirect('/register');
            // console.log(req.body);
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            res.redirect('/register');
        }
    },
    processLogin: async (req, res) => {
        try{
            const { username, password } = req.body;
            const user = await User.findOne({username: username});
            if (!user){
                req.flash('alertMsg', 'Sorry! Your username not match.');
                req.flash('alertStatus', 'danger');
                return res.redirect('/login');
            } 
            const isPasswordMatch =  await bcrypt.compare(password, user.password);
            if (!isPasswordMatch){
                req.flash('alertMsg', 'Sorry! Your password not match.');
                req.flash('alertStatus', 'danger');
                return res.redirect('/login');
            }
            // console.log(isPasswordMatch);
            req.session.user = {
                id: user.id,
                username: user.username,
                fullname: user.fullName
            }

            req.flash('alertMsg', 'Hello, welcome to admin ' + user.username + '. Stay Strong and Good Luck!');
            req.flash('alertStatus', 'success');
            res.redirect('/dashboard');
        } catch(error){
            req.flash('alertMsg', error.message)
            req.flash('alertStatus', 'danger');
            return res.redirect('/login');
        }
    },
    update: async (req, res) => {
        const{id, fullName, phone, email, password, username} = req.body;
        await User.updateOne({_id:id}, {
            fullName: fullName,
            phone: phone,
            email: email,
            password: password,
            username: username
        });
        res.redirect('/user');
    },
    delete: async (req, res) => {
        const{id} = req.params;
        await User.deleteOne({_id:id});
        res.redirect('/user');
    },
    logout: async (req, res) => {
        try {
            req.session.destroy();
            res.redirect('/login');
        } catch (error) {
            console.error(error);
        }
    },
}
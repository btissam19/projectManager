// singupController = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const checking = await User.findOne({ email });

//         if (checking) {
//             return res.render('sing', { layout: false, msg: 'User already exists in the database!' });
//         } else {
//             const saltRounds = 10;
//             const salt = await bcrypt.genSalt(saltRounds);
//             const hashedPassword = await bcrypt.hash(password, salt);
//             await User.insertMany([{ email, password: hashedPassword }]);
//             res.redirect('/login');

//         }
//     } catch (e) {
//         return res.status(500).send(e.message);
//     }
// };
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
//   var opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//   opts.secretOrKey = config.secret;
//   passport.use(
//     new JwtStrategy(opts, function(jwt_payload, done) {
//       Admin.findOne({ _id: jwt_payload.id }, function(err, user) {
//         if (err) {
//           return done(err, false);
//         }
//         if (user) {
//           done(null, user);
//         } else {
//           done(null, false);
//         }
//       });
//     })
//   );
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password"
//     },
//      function(email, password, done) {
// 	  console.log("local");
// 	 }
//     //   await Admin.findOne(email, async (err, user) => {
//     //     if (err) return done(err);
//     //     if (!user) {
//     //       return done(null, false, {
//     //         success: false,
//     //         msg: "Tên đăng nhập hoặc mật khẩu sai."
//     //       });
//     //     } else {
//     //       const match = await bcrypt.compare(password, user.hash_password);
//     //       if (match) {
//     //         return done(null, user);
//     //       } else {
//     //         return done(null, false, {
//     //           msg: "Tên đăng nhập hoặc mật khẩu sai."
//     //         });
//     //       }
//     //     }
//     //   });
//     // }
//   )
// );
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async function(email, password, done) {
      //   console.log("email", email);
      await User.findOne({ email }, (err, user) => {
        console.log("email", email);
        console.log("uses", user);
        if (err) return done(err);
        if (!user) {
          return done(null, false, {
            success: false,
            msg: "Tên đăng nhập hoặc mật khẩu sai."
          });
        } else {
          const match = bcrypt.compare(password, user.hash_password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, {
              msg: "Tên đăng nhập hoặc mật khẩu sai."
            });
          }
        }
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(async function(email, done) {
  await User.findOne({ email }, function(err, user) {
    done(err, user);
  });
});

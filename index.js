//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| X_X |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const PORT = process.env.PORT || 3001
// Syncing all the models at once.

conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});



/* curl -X POST \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer TEST-8267019366989212-021713-76aeb122582efd463b75a1bf20744460-138152494' \
"https://api.mercadopago.com/users/test_user" \
-d '{"site_id":"MLA"}'
 */
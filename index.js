//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| X_X |)
//                      0\  U  /0
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
const app = require("./src/app.js");
const { conn } = require("./src/db.js");
const initSocket = require("./src/chat");

const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  const server = app.listen(PORT, () => {
    console.log(`listening at ${PORT}`); // eslint-disable-line no-console
  });
  initSocket(server);
});

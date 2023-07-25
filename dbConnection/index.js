const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "aberama.iran.liara.ir",
  user: "root",
  password: "zrCFSSXAVz52FVParRyTbWi6",
  connectionLimit: 5,
  port: 33121,
  database: "ecommerce_db",
  bigIntAsNumber: true,
});

const ExecuteQuery = async (query) => {
  let conn;
  conn = await pool.getConnection();
  const res = await conn.query(query);
  return res;
};

module.exports = ExecuteQuery;

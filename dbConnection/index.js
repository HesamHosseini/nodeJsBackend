const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "aberama.iran.liara.ir",
  user: "root",
  password: "zrCFSSXAVz52FVParRyTbWi6",
  connectionLimit: 5,
  port: 33121,
});

const ExecuteQuery = async (query) => {
  let conn;
  conn = await pool.getConnection();
  const rows = await conn.query(query);
  return rows;
};

module.exports = ExecuteQuery;

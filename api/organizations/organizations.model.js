const knex = require("knex");
const config = require("../../knexfile");

const db = require("../../data/dbConfig.js");

// get ALL orgs (for superUsers)
function findAll() {
  return db("organizations");
}

function findAllAndData() {
  return db("accounts as a",)
    .join("organizations as o","a.org_id","o.id",)
    .where("a.org_id","=", "o.id");
}
//get pumps by org id
// function getPumpsByOrgId(org_id){
//     return db("pumps as p")
//     .join("organizations as o", "o.id", "p.org_id")
//     .where("p.org_id", "=", "o.id");
// }

function getInfoByOrgId(id) {
  return db("organizations  as o")
    .join("pumps as p", "p.org_id", "o.id")
    .join("accounts as a","a.org_id","o.id" )
    .join("sensors as s", "s.physical_id", "p.sensor_pid")
    .where({ org_id:id })
    .select([
      "a.id",
      "s.id as sensor_index",
      "s.physical_id",
      "s.kind",
      "s.type",
      "s.cellular",
      "s.bluetooth",
      "s.training",
      "s.remark",
      "s.data_finished",
      "s.depth",
      "s.yield",
      "s.static",
      "s.quality",
      "p.id as pump_index",
      "p.sensor_pid",
      "p.org_id",
      "o.org_name",
      "o.headquarter_city",
      "p.country_name as village_name",
      "p.district_name",
      "p.province_name",
      "p.commune_name",
      "p.latitude",
      "p.longitude",
    ])
    
}
//get users by org id
function getUsersByOrg(org_id){
  return db("accounts as a")
  .join("organizations as o", "o.id","a.org_id")
  .where("a.org_id","=", "o.id")
  .and("a.role","=","org_user");
}



function findByOrgName(org_name) {
  return db("organizations as o")
    .where({ org_name })
    .join("accounts as a", "a.id", "o.org_id")
    .join("pumps as p", "o.id", "p.org_id")
    .join("sensors as s", "o.id", "s.org_id");
}

function update(changes, id) {
  try {
    return db("organizations")
      .where({ id })
      .update(changes);
  } catch (err) {
    console.log(err.message);
  }
}

function findById(id) {
  return db("organizations")
    .where({ id })
    .first();
}

async function insert(user) {
  const [id] = await db("organizations")
    .insert(user)
    .returning("id");

  return findById(id);
}
const remove = id => {
  return db("organizations")
    .where({ id })
    .del();
};

module.exports = {
  findAll,
  findById,
  findAllAndData,
  findByOrgName,
  update,
  remove,
  insert
};

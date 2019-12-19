const router = require("express").Router();
const { authenticate } = require("../middleware/middleware");
const Organizations = require("./organizations.model");
const { validateOrg, validateOrgUpdate } = require("../middleware/middleware");
const isEmptyObj = require("../utils/isEmptyObj");
const withCatch = require("../utils/withCatch");
// GET to /api/orgs
router.get("/", async (req, res) => {
  try {
    const orgs = await Organizations.findAll();
    res.status(200).json(orgs);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});
// GET /api/orgs/{}/info
router.get("/:org_id/pumps", async (req, res) => {
    
  const [pumps] = await Organizations.getPumpsById(req.params.org_id)
  res

  if (err) res.status(500).json(err)
  else if (err || isEmptyObj(pumps)) res.status(404).json({ error: "There are no pumps associated with this id"})
  else res.status(200).json(pumps)
})

// GET to /api/orgs/1
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Organizations.findById(id)
    .then(org => {
      console.log("org", org);
      if (org) {
        res.status(200).json(org);
      } else {
        res.status(404).json({ message: "Could not find org with given id." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// POST to api/orgs
router.post("/", validateOrg, async (req, res) => {
  try {
    const org = req.body;
    console.log("org", org);
    const createdOrg = await Organizations.insert(org);
    res.status(200).json(createdOrg);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// PUT to /api/orgs/1
router.put("/:id", authenticate, validateOrgUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedOrg = await Organizations.update(changes, id);
    res.status(200).json(updatedOrg);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// DELETE to /api/orgs/4
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Organizations.remove(id);
    res.status(200).json(removed);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;

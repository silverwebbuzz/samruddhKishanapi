const knex = require("knex")(require("../../helper/db"));
const { json } = require("body-parser");

// Create subscriber
module.exports.createSubscriber = async (req, res) => {
  try {
    var subscriber = {
      email: req.body.email,
    };
    if (subscriber) {
      await knex("smk_subscribers").insert(subscriber);

      res.json({
        status: 200,
        data: subscriber,
        message: "subscriber Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "subscriber Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

//delete Subscriber api
module.exports.deleteSubscriber = async (req, res) => {
  try {
    const id = req.body.id;
    const deleteSubscriber = await knex("smk_subscribers")
      .delete()
      .where({ id });

    if (deleteSubscriber) {
      res.json({
        status: 200,
        message: "Subscriber Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Subscriber Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

// // Get All Subscribers
module.exports.getAllSubscriber = async (req, res) => {
  try {
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_subscribers").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getSubscriberQuery = knex("smk_subscribers")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const getSubscriber = await getSubscriberQuery;

    if (getSubscriber) {
      res.json({
        status: 200,
        data: getSubscriber,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Subscribers Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Subscriber Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};

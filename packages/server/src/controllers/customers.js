const express = require("express");
const CustomersService = require("../domain/customers");
const { Op, QueryTypes } = require("sequelize");
const { sequelize, Customer, CustomerInterest } = require("../models");

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const customersService = new CustomersService(request.log, sequelize);

    const customers = await customersService.getList(request.query);

    response.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});


router.post('/addCustomer', function (request, response, next) {
  try {
    const body = request.body;
    const params = request.params;
    CustomerInterest.create((body["interest"])).then(async (interest) => {
      try {
        body["CustomerInterestId"] = interest["id"];

        //rule 1
        const rule1 = await sequelize.query('select staffMemberId, MAX(count) as "count" from (select staffMemberId, COUNT(*) as "count" from sl_robot_experts where robotId in ( select id from sl_robots where type = :type and autonomy = :autonomy and weight = :weight and brandId = :brandId and price BETWEEN :minPrice AND :maxPrice) group by staffMemberId ) cnt group by staffMemberId;', {
          type: QueryTypes.SELECT,
          replacements: {
            type: interest["hardwareType"],
            autonomy: interest["autonomy"],
            weight: interest["weight"],
            brandId: interest["brandId"],
            minPrice: interest["minPrice"],
            maxPrice: interest["maxPrice"]
          }
        });

        if (rule1.length > 1) {
          //rule 2
          const staffMemberIds = [];
          rule1.forEach(element => {
            staffMemberIds.push(element["staffMemberId"]);
          });

          const rule2 = await sequelize.query('select staffMemberId, MAX(count) as "count"  from ( select staffMemberId, AVG(count) as "count" from ( select rc.count, re.staffMemberId from ( select id, COUNT(id) as "count" from ( select r.id, rf.featureId from sl_robots r inner join sl_robot_features rf on r.id = rf.robotId where  type = :type and  autonomy = :autonomy and  weight = :weight and  brandId = :brandId and  price BETWEEN :maxPrice AND :minPrice )  cnt group by id) rc inner join sl_robot_experts re on rc.id = re.robotId ) res group by staffMemberId ) fr group by staffMemberId;', {
            type: QueryTypes.SELECT,
            replacements: {
              type: interest["hardwareType"],
              autonomy: interest["autonomy"],
              weight: interest["weight"],
              brandId: interest["brandId"],
              minPrice: interest["minPrice"],
              maxPrice: interest["maxPrice"]
            }
          });

          if (rule2.length > 1) {
            const rule3 = await sequelize.query('select staffMemberId, AVG(price) from (select re.staffMemberId, r.price from sl_robots r inner join sl_robot_experts re on r.id = re.robotId where type = :type and autonomy = :autonomy and weight = :weight and brandId = :brandId and price BETWEEN :minPrice AND :maxPrice ) rs group by staffMemberId;', {
              type: QueryTypes.SELECT,
              replacements: {
                type: interest["hardwareType"],
                autonomy: interest["autonomy"],
                weight: interest["weight"],
                brandId: interest["brandId"],
                minPrice: interest["minPrice"],
                maxPrice: interest["maxPrice"]
              }
            });
            if (rule3.length > 1) {
              const rule4 = await sequelize.query('SELECT id FROM sl_staff_members ORDER BY RAND() LIMIT 1;', {
                type: QueryTypes.SELECT,
              });
              body["staffMemberId"] = rule4[0]["id"];
            }
            else if (rule3.length == 1) {
              body["staffMemberId"] = rule3[0]["staffMemberId"];
            }
            else {
              const rule4 = await sequelize.query('SELECT id FROM sl_staff_members ORDER BY RAND() LIMIT 1;', {
                type: QueryTypes.SELECT,
              });
              body["staffMemberId"] = rule4[0]["id"];
            }
          }
          else if (rule2.length == 1) {
            body["staffMemberId"] = rule2[0]["staffMemberId"];
          }
          else {
            const rule4 = await sequelize.query('SELECT id FROM sl_staff_members ORDER BY RAND() LIMIT 1;', {
              type: QueryTypes.SELECT,
            });
            body["staffMemberId"] = rule4[0]["id"];
          }

        }
        else if (rule1.length == 1) {
          body["staffMemberId"] = rule1[0]["staffMemberId"];
        }
        else {
          const rule4 = await sequelize.query('SELECT id FROM sl_staff_members ORDER BY RAND() LIMIT 1;', {
            type: QueryTypes.SELECT,
          });
          body["staffMemberId"] = rule4[0]["id"];
        }
        Customer.create(body).then((customer) => {
          response.status(200).json(customer);
        });
      } catch (error) {
        next(error);
      }
    });

  } catch (error) {
    next(error);
  }
});


module.exports = router;
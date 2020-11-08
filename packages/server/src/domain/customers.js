class CustomersService {
    constructor(logger, sequelize) {
        this.logger = logger;
        this.sequelize = sequelize;
    }

    async getList(filters = {}) {
        this.logger.info({ data: { filters } }, "Retrieving the list of customers");

        const { Brand, CustomerInterest, StaffMember, Customer } = this.sequelize.models;

        return Customer.findAll({
            where: filters,
            include: [
                {
                    model: CustomerInterest,
                    as: "interest",
                    include: [
                        {
                            model: Brand,
                            as: "brand"
                        }
                    ]
                },
                {
                    model: StaffMember,
                    as: "assignedStaffMember",
                }
            ],
        });
    }

}

module.exports = CustomersService;

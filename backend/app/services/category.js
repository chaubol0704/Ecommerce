const { ObjectId } = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("category")
    }
    // Định nghĩa các phương thức truy xuất CSDL use mongodb API

    extractConactData(payload) {
        // console.log(payload)
        const category = {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            phone: payload.phone,
        }

        // remove underfined fields
        // console.log(user)
        Object.keys(category).forEach(

            (key) => category[key] === undefined && delete category[key]
        );
        return category
    }

    async create(payload) {
        const user = this.extractConactData(payload)
        // console.log(payload)
        const result = await this.User.findOneAndUpdate(
            user,
            { $set: { favorite: user.favorite == true } },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $option: "i" }
        })
    }

    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
    }

    async update(id, payload) {
        // console.log(id,payload)
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);

        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        // console.log(result)
        return result;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }


    // async deleteAll() {
    //     const result = await this.User.deleteMany({});
    //     return result.deletedCount;
    // }
}

module.exports = CategoryService
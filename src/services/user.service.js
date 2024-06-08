
class UsersService {
    constructor(dao){
        this.dao = dao;
    }

    async getAll(queryParams = null){
        return await this.dao.getAll()
    }

    async getById(id){    
        const item = await this.dao.getById(id); 
        if(!item) throw { message:`There's no Item by id ${id}`, status:400 }
        return item;
    }

    async getByProperty(property, value){
        const item = await this.dao.getByProperty(property, value); 
        if(!item) throw { message:`There's no Item by ${property} = ${value}`, status:400 }
        return item;
    }


    async create(user){
        return await this.dao.create(user);
    }

    async update(id, user){
        await this.dao.getById(id);
        return await this.dao.update(id, user);
    }

    async delete(id){
        await this.dao.getById(id);
        return await this.dao.delete(id);
    }

    async setLastConnection(id){
        const user = await this.getById(id);
        await this.update(id, {last_connection: new Date().toLocaleString()})
    }
}


module.exports = UsersService;
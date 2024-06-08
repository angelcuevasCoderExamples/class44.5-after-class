
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

    async addDocuments(id, files){
        const user = await this.getById(id);
        let documents = user.documents || []; 
        
        documents = [...documents,...(files.map(file=>{
            return {name: file.originalname, reference: file.path.split('public')[1].replace(/\\/g,'/')}
        }))]

        return await this.update(id, {documents: documents})
    }
    async addProfilePicture(id, file){
        await this.getById(id);
        return await this.update(id, {profile_picture: file.path.split('public')[1].replace(/\\/g,'/')})
    }
}


module.exports = UsersService;
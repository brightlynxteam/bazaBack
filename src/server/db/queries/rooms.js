const knex = require('../connection');

async function editRoom(data) {
    const res = await knex('rooms')
        .where({ 'id' : data.id })
        .update(data);
    if(res){
        return await knex('rooms').where({ 'id' : data.id }).select('id','number','description','active','housing', 'capacity');
    }else{
        return 0;
    }
    //
}

module.exports = {
    editRoom,
};

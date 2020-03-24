const Group = require('models/group');

exports.list = async (ctx) => {
    
    let groups;

    try {
        groups = await Group.find().exec();
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = groups;
};

exports.create = async (ctx) => {
    
    const {
        name
    } = ctx.request.body;

    const group = new Group({
        name
    });

    try {
        await group.save();
    } catch(e) {
        return ctx.throw(500, e);
    }
    ctx.body = group;

};


exports.get = async (ctx) => {

    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    let group;

    try {
        group = await Group.findById(id).exec();
    } catch (e) {
        
        if(e.name === 'CastError') {
            ctx.status = 400;
            return;
        }

        return ctx.throw(500, e);
    }

    if(!group) {
        ctx.status = 404;
        ctx.body = { message: 'group not found' };
        return;
    }

    ctx.body = group;

}

exports.delete = async (ctx) => {
    
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    try {
        await Group.findByIdAndRemove(id).exec();
    } catch (e) {
        if(e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
    }

    ctx.status = 204; // No Content
};

exports.replace = async (ctx) => {
    
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    let group;

    try {
        group = await Group.findByIdAndUpdate(id, ctx.request.body, {
            upsert: true, // 이 값을 넣어주면 데이터가 존재하지 않으면 새로 만들어줍니다
            new: true // 이 값을 넣어줘야 반환하는 값이 업데이트된 데이터입니다.
                      // 이 값이 없으면 ctx.body = book 했을때 업데이트 전의 데이터를 보여줍니다.
        });
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = group;

};

exports.update = async (ctx) => {
    
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    let group;

    try {
        // 아이디로 찾아서 업데이트를 합니다.
        // 파라미터는 (아이디, 변경 할 값, 설정) 순 입니다.
        group = await Group.findByIdAndUpdate(id, ctx.request.body, {
            // upsert 의 기본값은 false 입니다.
            new: true // 이 값을 넣어줘야 반환하는 값이 업데이트된 데이터입니다. 이 값이 없으면 ctx.body = book 했을때 업데이트 전의 데이터를 보여줍니다.
        });
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = group;

};
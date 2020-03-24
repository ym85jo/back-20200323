const User = require('models/user');

exports.list = async (ctx) => {
    
    let users;

    try {
        users = await User.find().exec();
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = users;
};

exports.create = async (ctx) => {
    const {
        name
        , email
        , sabun
        , password
        , group
    } = ctx.request.body;

    const user = new User({
        name
        , email
        , sabun
        , password
        , group
    });

    try {
        await user.save();
    } catch(e) {
        return ctx.throw(500, e);
    }
    ctx.body = user;

};


exports.get = async (ctx) => {

    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    let user;

    try {
        user = await User.findById(id).exec();
    } catch (e) {
        
        if(e.name === 'CastError') {
            ctx.status = 400;
            return;
        }

        return ctx.throw(500, e);
    }

    if(!user) {
        ctx.status = 404;
        ctx.body = { message: 'user not found' };
        return;
    }

    ctx.body = user;

}

exports.delete = async (ctx) => {
    
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    try {
        await User.findByIdAndRemove(id).exec();
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

    let user;

    try {
        user = await User.findByIdAndUpdate(id, ctx.request.body, {
            upsert: true, // 이 값을 넣어주면 데이터가 존재하지 않으면 새로 만들어줍니다
            new: true // 이 값을 넣어줘야 반환하는 값이 업데이트된 데이터입니다.
                      // 이 값이 없으면 ctx.body = book 했을때 업데이트 전의 데이터를 보여줍니다.
        });
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = user;

};

exports.update = async (ctx) => {
    
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    let user;

    try {
        // 아이디로 찾아서 업데이트를 합니다.
        // 파라미터는 (아이디, 변경 할 값, 설정) 순 입니다.
        user = await User.findByIdAndUpdate(id, ctx.request.body, {
            // upsert 의 기본값은 false 입니다.
            new: true // 이 값을 넣어줘야 반환하는 값이 업데이트된 데이터입니다. 이 값이 없으면 ctx.body = book 했을때 업데이트 전의 데이터를 보여줍니다.
        });
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = book;

};
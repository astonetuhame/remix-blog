const { PrismaClient } = require('@prisma/client')
const db  = new PrismaClient()


async function seed(){
    await Promise.all(
        getPosts().map(post =>{
            return db.post.create({ data: post})
        })
    )
}

seed()

function getPosts() {
    return [
        {
            title: 'PHP',
            body: 'A body about Php'
        },
        {
            title: 'Javascript',
            body: 'A body about Javascript'
        },
        {
            title: 'Python',
            body: 'A body about python'
        },
        {
            title: 'Typescript',
            body: 'A body about typescript'
        },
        {
            title: 'Nodejs',
            body: 'A body about nodejs'
        }
    ]
}



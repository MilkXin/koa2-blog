const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlogData, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    const author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async function (ctx, next) {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async function (ctx, next) {
    const body = ctx.request.body
    body.author = req.session.username
    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async function (ctx, next) {
    const val = await updateBlogData(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

router.post('/del', loginCheck, async function (ctx, next) {
    const author = ctx.session.username
    const val = await delBlog(ctx.query.id, author)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除博客失败')
    }
})

module.exports = router

export const name = 'anti_smallprogram'
import { Context } from 'koishi-core'
import { CQCode } from 'koishi-utils'
import axios from 'axios'

export function apply (ctx: Context) {
    const logger = ctx.logger("anti-smallprogram")
    ctx.middleware(async (meta, next) => {
        if (!~meta.message.indexOf('[CQ:rich')) return next()
        const rich = CQCode.parse(meta.message)
        if (rich.data.title !== '[QQ小程序]哔哩哔哩') return next()
        const content = JSON.parse(<string>rich.data.content)
        if (!('detail_1' in content) || content.detail_1.appid !== '1109937557') return next()
        logger.debug(content.detail_1)
        let search
        try {
            search = await axios.get('https://api.bilibili.com/x/web-interface/search/all/v2?highlight=0&keyword=' + encodeURI(content.detail_1.desc))
            search = search.data.data
            logger.debug(search)
        } catch (e) {
            logger.debug(e)
            logger.error('Request Bilibili failed')
            return meta.$send('[Bilibili]' + content.detail_1.desc + '\n[CQ:image,file=' + content.detail_1.preview + ']')
        }
        if (search.numResults <= 0) {
            logger.error('Bilibili video not found')
            return meta.$send('[Bilibili]' + content.detail_1.desc + '\n[CQ:image,file=' + content.detail_1.preview + ']')
        }
        while (search.result.length) {
            const i = search.result.pop()
            if (i.data.length) {
                const item = i.data[0]
                const title = item.title || item.game_name || item.uname
                const url = item.arcurl || item.goto_url || item.game_url || (item.mid ? 'https://space.bilibili.com/' + item.mid : '')
                const img = item.pic || item.cover || item.game_icon || item.upic
                return meta.$send(url + "\n" + title.replace(/<\/?.+?>/g,"") + "\n" + '[CQ:image,file=http:' + img + ']')
            }
        }
    })
}
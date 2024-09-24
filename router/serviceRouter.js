import { Router } from "express";
import { serviceController } from "../controller/controller.js";
export const serviceRouter = Router()

serviceRouter.get('/search',serviceController.search)
serviceRouter.get('/yts',serviceController.ytSearch)
serviceRouter.get('/ytmp3',serviceController.youtubeMp3Downloeader)
serviceRouter.get('/pdf/:id/:search',serviceController.getMAngaChapter)
serviceRouter.get('/nvs',serviceController.searchMangas)
serviceRouter.get('/nvi',serviceController.getMangaInfo)
serviceRouter.get('/nvs-c',serviceController.searchByCategory)
serviceRouter.get('/nv-cat',serviceController.getCategories)
serviceRouter.get('/tts',serviceController.audioTTS)
serviceRouter.get('/tts2',serviceController.audioTTS2)
serviceRouter.get('/texto/:id',serviceController.frases)




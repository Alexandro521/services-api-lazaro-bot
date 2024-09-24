import ytsr from 'ytsr'
import {millify} from "millify";
import axios from 'axios'
import fs from 'fs'
import fetch from 'node-fetch';
import { toJpg } from '../web.js';
import { pipeline } from 'stream'
import { promisify } from 'util'
import { chistes,educativas,educativas2,frasesBonitas,frasesCitadas,frasesCortas,frasesGraciosas,preguntas,refranes} from '../recursos/json.js';
const pipe = promisify(pipeline);

async function axiosGet(url){
   const response =  await axios.get(url,{
        headers:{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
            }
    })
    return response.data
}

export default class serviceModel{
    static async search({search}){
        try{  
        const response = await axiosGet(search.url)
        const limpiarObjeto = response.replace(search.clearHeader,'').replace(')','').replace('/*O_o*/','').replace('};','}').replaceAll(');',(''));
        const parsearObjeto = JSON.parse(limpiarObjeto)
        const objetoFinal = [];
        const obj = parsearObjeto.results
        for(let i = 0;i< obj.length;i++){
              objetoFinal.push({
                url: obj[i].url,
                title: obj[i].contentNoFormatting
            })
        }
        return objetoFinal
        }catch(e){
            console.log(e)
         return {message: 'error'}
        }
    }
    static async ytSearch(search){
       try{
        const searchResults = await ytsr(search,{limit:10,hl:'es'});
        const videoList = []
        searchResults.items.forEach(element => {
            if(element.type === 'video'){
                videoList.push({
                    title:element.title,
                    id: element.id,
                    url:element.url,
                    img:element.bestThumbnail.url,
                    author:element.author.name,
                    views:millify(element.views, {
                        precision: 2,  
                        locales: "de-DE"
                      }),
                    duration:element.duration,
                    date: element.uploadedAt
                })
            }
        })
        console.log(videoList)
        return {
            search: searchResults.originalQuery,
            results: videoList
        }
       }catch(e){
        console.log(e)
        return {message: 'error'}
       } 
    }
    static async getMangaSearchList(search){
        try{
        const response = await axios.get(`http://localhost:1234/api/search?query=${search}`)
        const data = response.data
        return data.body
        }catch(err){
            console.log(err)
            return err
        }
    }
    static async getMangaSearchCategory(search){
        try{
            const response = await axios.get(`http://localhost:1234/api/category/${search}`)
            const data = response.data
            return data
            }catch(err){
                console.log(err)
                return err
            }
    }
    static async getMangaCategories(){
        try{
            const response = await axios.get(`http://localhost:1234/api/info/genres`)
            const data = response.data
            return data
            }catch(err){
                console.log(err)
                return err
            }
    }
    static async getMangaInfoById(mangaId){
        try{
            const response = await axios.get(`http://localhost:1234/api/view/${mangaId}`)
            const data = response.data
            return data
            }catch(err){
                console.log(err)
                return err
            }
    }
    static async getMAngaChapter(chapterID){
        try{
            const response = await axios.get(`http://localhost:1234/api/reader/Cap-tulo-1/1616037/`)
            const data = response.data
            const pages = data.pages
            const OUPUT_FOLDER = process.cwd()+'/download/img-coverter/webp'
            let i = -1
            async function downloadImage(page){
              const url = page
              const data = await fetch(url)
              const desthPat = `${OUPUT_FOLDER}/pagina_${i+=1}.webp`
                await new Promise((resolve, reject) => {
                  const fileStream = fs.createWriteStream(desthPat);
                  fileStream.on('finish', resolve);
                  fileStream.on('error', reject);
                  data.body.pipe(fileStream);
                });
              }
           const promises= pages.map(async (page) =>{
              await downloadImage(page)
            })
            await Promise.all(promises)
            console.log('finish')
            await fs.readdir(process.cwd()+'/download/img-coverter/webp',{
                encoding: 'utf-8',},
                async (err,files)=>{
                   await toJpg(files)
                   await fs.readdir(process.cwd()+'/download/img-coverter/jpeg',{
                    encoding: 'utf-8'
                   },(err,files)=>{
                    console.log(files)
                   })
               })

            }catch(err){
                console.log(err)
                return err
            }  
            
    }
    static async frases(id){
        const random = (limit)=> Math.floor(Math.random()*limit)
        if(id===1){
            return chistes.list[random(chistes.list.length)].trim()
        }
        else if(id===2){
            return educativas.list[random(educativas.list.length)].trim()
        }
        else if(id===3){
            return educativas2.list[random(educativas2.list.length)].trim()
        }
        else if(id===4){
            return frasesBonitas.list[random(frasesBonitas.list.length)].trim()
        }
        else if(id===5){
            return frasesCitadas.list[random(frasesCitadas.list.length)].trim()
        }
        else if(id===6){
            return frasesGraciosas.list[random(frasesGraciosas.list.length)].trim()
        }
        else if(id===7){
            return frasesCortas.list[random(frasesCortas.list.length)].trim()
        }
        else if(id===8){
            return  refranes.list[random(refranes.list.length)].trim()
        }
        else if(id===9){
            return preguntas.list[random(preguntas.list.length)].trim()
        }
    }
  
}

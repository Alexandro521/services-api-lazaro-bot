import  serviceModel  from "../models/serviceModel.js"
import { youtubeLink,googleLink } from "../utils/enlaces.js"
import fs, { readdirSync } from 'fs';
import { createWriteStream } from 'fs';
import child_process from 'node:child_process'
import { builfPDF } from "../function/pdfCreate.js";
import axios from 'axios'
import fetch from 'node-fetch';
import { toJpg } from '../web.js';
import webp from 'webp-converter'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { tts } from "../services/tts.js";
import { createAudioFileFromText } from "../services/tts2.js";
const pipe = promisify(pipeline);
const streamPipeline = promisify(pipeline);
webp.grant_permission();

export class serviceController{
   static async  search(req,res){
    const query = (req.query.q).replaceAll(' ','+') ?? 'hola+mundo'
    const search = googleLink(query)
    const result = await serviceModel.search({search})
    res.json({object: result })
    }
   static async ytSearch(req,res){
    const query = (req.query.q) ?? 'hola+mundo'
    const result = await serviceModel.ytSearch(query)
    res.json(result)
    }
   static async youtubeMp3Downloeader(req,res){
   try{
    const ytdLink = req.query.ytdLink
    if(ytdLink){
     const remove =  fs.unlink(process.cwd()+'/download/audios/audio.mp3',err =>  {
        if(err){
          let comando = child_process.spawn('cmd',['/c','C:\\yt-dlp -o download/audios/audio -x --audio-format mp3 --audio-quality low  '+ytdLink]);

          comando.stdout.on('data',data =>{
            console.log(data.toString())
          })
          comando.stderr.on('data',data=>{
            console.log(data.toString())
          })
          
          comando.on('exit',codigo=>{
            console.log('descarga terminada:',codigo)
            res.sendFile(process.cwd()+'/download/audios/audio.mp3')
          })
        }else{
        let comando = child_process.spawn('cmd',['/c','C:\\yt-dlp -o download/audios/audio -x --audio-format mp3 --audio-quality low  '+ytdLink]);

        comando.stdout.on('data',data =>{
          console.log(data.toString())
        })
        comando.stderr.on('data',data=>{
          console.log(data.toString())
        })
        
        comando.on('exit',codigo=>{
          console.log('descarga terminada:',codigo)
          res.sendFile(process.cwd()+'/download/audios/audio.mp3')
        })
      }
      })
    
}else{
    res.status(404).json({message:'Error'})
}

    }catch(e){
     console.log(e)   
    }
     
    }
   static async searchMangas(req,res){
      const query = req.query.q
      if(!query) res.status(404).json({message:'especifica un texto a buscar'})
      const data = await serviceModel.getMangaSearchList(query)
      console.log(data)
      res.json(data)
   }
  static async searchByCategory(req,res){
    const query = req.query.q
    if(!query) res.status(404).json({message:'especifica un texto a buscar'})
    const data = await serviceModel.getMangaSearchCategory(query)
    console.log(data)
    res.json(data)
  }
  static async getCategories(req,res){
    const data = await serviceModel.getMangaCategories()
    console.log(data)
    res.json(data)
  }
  static async getMangaInfo(req,res){
      const query = req.query.q
      if(!query) res.status(404).json({message:'especifica un texto a buscar'})
      const data = await serviceModel.getMangaInfoById(query)
      res.json(data)
  }
   static async getMAngaChapter(req,res){
    try{
  
         const id = req.params.id
         const search = req.params.search 
        // const search = req.params.search
     
        let z = 0
       
        const response = await axios.get(`http://localhost:1234/api/reader/${id}/${search}`)
        const data = response.data
        const pages = data.pages
        const title = data.captitle
        // if(data.message==="path not exist"){
        //   res.status(404).sendFile(process.cwd()+'/download/404.png');
        // }
        // if(pages.length < 1){
        //   res.status(404).sendFile(process.cwd()+'/download/404.png');
        // }
        const OUPUT_FOLDER = process.cwd()+'/download/img-coverter/webp'
        let i = 0
        async function downloadImage(page,index){
          const url = page
          const data = await fetch(url)
          const desthPat = `${OUPUT_FOLDER}/pagina_${pages.indexOf(url)}.webp`
            await new Promise(async (resolve, reject) => {
              const fileStream = fs.createWriteStream(desthPat);
              fileStream.on('finish', resolve);
              fileStream.on('error', reject);
              data.body.pipe(fileStream);
            });
          }
        const promises = pages.map(async (page,index) =>{
          await downloadImage(page,index)
        })

      await Promise.all(promises)
        console.log('convertir imagenes')
      await fs.readdir(process.cwd()+'/download/img-coverter/webp',{
            encoding: 'utf-8',},
            async (err,files)=>{
               console.log(files.sort((a, b) => {
                let numA = parseInt(a.split('_')[1].split('.')[0]);

                let numB = parseInt(b.split('_')[1].split('.')[0]);
                return numA - numB}
              ))
               const webpImg = files.sort((a, b) => {
                let numA = parseInt(a.split('_')[1].split('.')[0]);

                let numB = parseInt(b.split('_')[1].split('.')[0]);
                return numA - numB}
              )
               await toJpg(webpImg)
               await fs.readdir(process.cwd()+'/download/img-coverter/jpeg',
               {
                encoding: 'utf-8'
               },
               async (err,files)=>{
                  console.log(files.sort((a, b) => {
                    let numA = parseInt(a.split('_')[1].split('.')[0]);
    
                    let numB = parseInt(b.split('_')[1].split('.')[0]);
                    return numA - numB}
                  ))
                  const jpegImg = files.sort((a, b) => {
                    let numA = parseInt(a.split('_')[1].split('.')[0]);
    
                    let numB = parseInt(b.split('_')[1].split('.')[0]);
                    return numA - numB}
                  )
                  const pdf = await builfPDF(title,jpegImg,(data)=>{
                  },async ()=>{ 
                    const file = await fs.readdir(process.cwd()+'/download/pdf/',{
                      encoding: 'utf-8'
                    },(err,files)=>{
                      let PDF = (process.cwd()+`/download/pdf/${(files.sort())[0]}`)    
                     webpImg.map(Element=>{
                        fs.unlink(process.cwd()+'/download/img-coverter/webp/'+Element,()=>{
                         console.log(Element + ' Delete')
                        })
                    })
                    jpegImg.map(Element=>{
                     fs.unlink(process.cwd()+'/download/img-coverter/jpeg/'+Element,()=>{
                       console.log(Element + ' Delete')
                      
                     })
                     z+= 1
                 })

                      res.download(PDF, function (err) {
                       if (err) {
                           console.log("Error");
                           console.log(err);
                       } else {
                           console.log("Success");

                        fs.readdir(process.cwd()+'/download/pdf',{
                          encoding: 'utf-8'
                        },(err,files)=>{
                           const file = files.sort()
                           fs.unlink(process.cwd()+'/download/pdf'+'/'+file[0],()=>{
                         -   console.log(file+' eliminado')
                           })
                        })
                       }    
                        });
                    })
                  })
               })
           })
          
        
        }catch(err){
            console.log(err)
            return err
        }  
        
  }
  static async audioTTS(req,res){
    const text = req.query.text 
    if(text){
     await tts(text,()=>{
        res.download(process.cwd()+"/download/tts/tts.mp3",(err)=>{
          if(err){
            console.log(err)
            
          }else{
            console.log('succes')
          }
        })
      })
    }
  }
  static async audioTTS2(req,res){
    const text = req.query.text 
    if(text){
     await createAudioFileFromText(text,()=>{
        res.download(process.cwd()+"/download/tts/tts2/tts2.mp3",(err)=>{
          if(err){
            console.log(err)
          }else{
            console.log('succes')
          }
        })
      })
    }
  }
  static async frases(req,res){
    const {id} = req.params
    console.log(id)
    const response = await serviceModel.frases(Number.parseInt(id))
    res.status(200).json({text: response})
  }
}

//serviceController.getMAngaChapter( "Capitulo-239/11457474/") 

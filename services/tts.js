import fs from 'node:fs'
import fetch from 'node-fetch';

export async function tts(text,callback){
    try{
        const options = {
            method: 'POST',
            headers: {
              'xi-api-key': 'babdf2ab361fc0aa6665174608cef26a',
              'Content-Type': 'application/json'
            },
            body: `{"voice_settings":{"stability":0.5,"similarity_boost":0.5,"use_speaker_boost":true,"style":0.2},"text":"${text}"}`
          };
          
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/2EiwWnXFnvU5JabPnv8n', options)
    const data = response.body
    const stream = fs.createWriteStream(process.cwd()+'/download/tts/tts.mp3')
    data.pipe(stream)
    stream.on('finish',callback)
    }catch(err){
        console.log(err)
    }
}
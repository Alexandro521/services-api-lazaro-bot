import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream } from "fs";


const client = new ElevenLabsClient({
  apiKey: '3fd37f0ac85e7f9a1da1cc26d0dc999e',
});

export const createAudioFileFromText = async (text,callFinish) => {
    try {
      const audio = await client.generate({
        voice: "Clyde",
        model_id: "eleven_multilingual_v1",
        text,
      });
      const fileName = `tts2.mp3`;
      const fileStream = createWriteStream(process.cwd()+'/download/tts/tts2/'+fileName);

      audio.pipe(fileStream);
      fileStream.on("finish",callFinish); // Resolve with the fileName
    } catch (error) {
      console.log(error)
    }
  }


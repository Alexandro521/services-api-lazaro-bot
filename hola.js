import child_process from 'node:child_process'

let comando = child_process.spawn('cmd',['/c','C:\\yt-dlp -P "C:\\Users\\alex\\Downloads\\googleServices\\Download\\Audios" -x --audio-format mp3 --audio-quality 0  https://www.youtube.com/watch?v=PIh2xe4jnpk']);

comando.stdout.on('data',data =>{
  console.log(data.toString())
})
comando.stderr.on('data',data=>{
  console.log(data.toString())
})

comando.on('exit',codigo=>{
  console.log('descarga terminada:',codigo)
})
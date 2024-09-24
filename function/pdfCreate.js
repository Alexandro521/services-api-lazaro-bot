import  PDFDocument from 'pdfkit'
import fs from 'fs'

export function builfPDF(title='untlited',images,datacallBack,endCallBack){

    const doc = new PDFDocument({autoFirstPage:false})

        doc.on("data",datacallBack)
        doc.on("end",endCallBack)

       const filename = title.trim().replaceAll("-","").replaceAll("/","_").toLowerCase()
       
       doc.pipe(fs.createWriteStream(process.cwd()+`/download/pdf/${filename[0].toUpperCase()+filename.slice(1).replace(":","")}.pdf`))
        images.map((imge,Index)=>{
        let  img = doc.openImage(process.cwd()+`/download/img-coverter/jpeg/${imge}`);
        doc.addPage({size: [img.width, img.height]});
        doc.image(img,0,0)
    })
    doc.end()
   
}

//const c = await builfPDF()
//console.log(c)
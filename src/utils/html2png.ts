
import html2Canvas from 'html2canvas';


export const downloadPicture = (dom: any) => {
    return new Promise((resolve: Function) => {
        console.log(dom)
        html2Canvas(dom).then((canvas) => {
            const dataUrl = canvas.toDataURL('image/png')
            const createDom = document.createElement('a')
            createDom.href = dataUrl
            createDom.download = '图片.png'
            createDom.click()
            console.log(dataUrl)
            resolve()
        })
    })
}
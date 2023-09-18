import dayjs from 'dayjs'
import Swal from 'sweetalert2'

export function download(href: string, title: string) {
    const a = document.createElement('a')
    a.setAttribute('href', href)
    a.setAttribute('download', title)
    a.click()
}

export function downloadJson(data: string, fileName: string) {
    const blob = new Blob([data], { type: 'text/json' })
    const href = window.URL.createObjectURL(blob)
    download(href, fileName)
    URL.revokeObjectURL(href)
}

export function getImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = document.createElement('img')

        image.src = url
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.addEventListener('abort', () => {
            reject('onabort')
        })
        image.addEventListener('error', () => {
            reject('onerror')
        })
    })
}

export function setBackgroundImage(dataUrl: string | null) {
    const div = gradioApp().getElementById('threedopenpose_background')
    dataUrl = !dataUrl ? 'none' : `url(${dataUrl})`

    if (div) div.style.backgroundImage = dataUrl
}

export function getCurrentTime(format = 'YYYY_MM_DD_HH_mm_ss') {
    return dayjs(new Date()).format(format)
}

export async function uploadJson() {
    const { value: file } = await Swal.fire({
        input: 'file',
        inputAttributes: {
            accept: 'application/json',
        },
    })

    if (!file) {
        return null
    }

    return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function () {
            resolve(reader.result as string)
        }

        reader.onerror = function () {
            reject(reader.error)
        }
        reader.readAsText(file)
    })
}

export async function uploadImage() {
    const { value: file } = await Swal.fire({
        input: 'file',
        inputAttributes: {
            accept: 'image/*',
        },
    })

    if (!file) {
        return null
    }

    return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function () {
            resolve(reader.result as string)
        }

        reader.onerror = function () {
            reject(reader.error)
        }
        reader.readAsDataURL(file)
    })
}

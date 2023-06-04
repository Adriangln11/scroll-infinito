const containerElement = document.getElementById('gifContainer')
const targetElement = document.getElementById('gifElement')
const options = {
    
    threshold: 0.5
}
let url = `https://api.giphy.com/v1/gifs/trending?api_key=7TJ92ylHZaHrj3tpcGi0m79i2eFGD1Q7&limit=50&rating=g`
let loading = false
const handleIntersect = ([entry]) => {
    if (!loading && url && entry.isIntersecting) {
        request()
    }
}
const createElement = item => {
    const node = document.createElement('div')
    node.classList.add('gifElement')
    node.innerHTML = `<div class="w-100 card d-flex flex-column text-center mb-3 p-3 border-radious-5"><span class="display-6 m-3 border-bottom border-secondary">By ${item.username}</span> <img class="w-100" src="${item.images.original.url}"></img></div>`
    return node
}
const render = data => {
    data.forEach(item => containerElement.appendChild(createElement(item)))
}
const request = async() => {
    const res = await fetch(url)
    const data = await res.json()
    render(data.data)
    loading = false
}


let observer = new IntersectionObserver(handleIntersect, options);

let target = targetElement
observer.observe(target);
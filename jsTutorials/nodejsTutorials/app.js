
//  CORE MODULES
const readline = require('readline')
const fs = require('fs')
const http = require('http')
const path = require('path')
const { json } = require('stream/consumers')
const url = require('url')
const events = require('events')

//   USER DEFINED MODULES
const replaceHtml = require('./modules/replaceHtml')
const user = require('./modules/user')

//TODO - WRITE AND READ CONSOLE
//********************************************* */
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("Please enter your name: ", (name) => {
//     console.log("You entered " + name);
//     rl.close();
// })

// rl.on('close', () => {
//     console.log("Interface closed");
//     process.exit(0)
// })
//********************************************* */


//TODO - READING AND WRITING FILE SYNC
// let datafs = fs.readFileSync('./files/example.txt', 'utf-8')
// console.log(datafs)

// let context = `Data text from previous txt: ${datafs} \nDate created ${new Date()}`;
// fs.writeFileSync('./files/example.txt', context)
// ********************************************* */



//TODO - READING AND WRITING FILE ASYNC
// fs.readFile('./files/start.txt', 'utf-8', (error1, data1) => {
//     console.log(data1)
//     fs.readFile(`./files/${data1}.txt`, 'utf-8', (error2, data2) => {
//         console.log(data2)
//         fs.readFile(`./files/append.txt`, 'utf-8', (error3, data3) => {
//             console.log(data3)
//             fs.writeFile('./files/output.txt', `${data2}\n\n${data3}\n\nData created ${new Date()}`, () => {
//                 console.log("FILE WRITTEN SUCCESFULLY")
//             })
//         })
//     })
// })
// console.log("fak this file")
// ********************************************* */


//TODO - SERVER & ROUTING

// const html = fs.readFileSync('./template/index.html', 'utf-8')
// let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
// let productListHtml = fs.readFileSync('./template/product-list.html', 'utf-8')
// let productDetailHtml = fs.readFileSync('./template/product-details.html', 'utf-8')

// let productsHtmlArray = products.map((prod) => {
//     let output = productListHtml.replace('{{%IMAGE%}}', prod.productImage)
//     output = output.replace('{{%NAME%}}', prod.name)
//     output = output.replace('{{%MODELNAME%}}', prod.modeName)
//     output = output.replace('{{%MODELNO%}}', prod.modelNumber)
//     output = output.replace('{{%SIZE%}}', prod.size)
//     output = output.replace('{{%CAMERA%}}', prod.camera)
//     output = output.replace('{{%PRICE%}}', prod.price)
//     output = output.replace('{{%COLOR%}}', prod.color)
//     output = output.replace('{{%ID%}}', prod.id)

//     return output
// })

// function replaceHtml(template, product){
//     let output = template.replace('{{%IMAGE%}}', product.productImage)
//     output = output.replace('{{%NAME%}}', product.name)
//     output = output.replace('{{%MODELNAME%}}', product.modeName)
//     output = output.replace('{{%MODELNO%}}', product.modelNumber)
//     output = output.replace('{{%SIZE%}}', product.size)
//     output = output.replace('{{%CAMERA%}}', product.camera)
//     output = output.replace('{{%PRICE%}}', product.price)
//     output = output.replace('{{%COLOR%}}', product.color)
//     output = output.replace('{{%ID%}}', product.id)
//     output = output.replace('{{%ROM%}}', product.ROM)
//     output = output.replace('{{%DESC%}}', product.Description)

//     return output
// }

// const server = http.createServer((request, response) => {
//      CONTENT
// });

const server = http.createServer();

server.listen(8000, "127.0.0.1", () => {
    console.log("Server has started")
})

// server.on('request', (request, response) => {

//     let {query, pathname: path} = url.parse(request.url, true)

//     // let path = request.url;

//     // HOME PAGE
//     if (path === "/" || path.toLocaleLowerCase() === "/home") {
//         response.writeHead(200, {
//             'Content-type': 'text/html',
//             'my-header': 'hello mother fucker'
//         })
//         response.end(html.replace('{{%CONTENT%}}', "Home Page"))
//         // ABOUT PAGE
//     } else if (path.toLocaleLowerCase() === "/about") {
//         response.writeHead(200, {
//             'Content-type': 'text/html',
//             'my-header': 'hello mother fucker'
//         })
//         response.end(html.replace('{{%CONTENT%}}', "About Page"))
//         // CONTACT PAGE
//     } else if (path.toLocaleLowerCase() === "/contact") {
//         response.writeHead(200, {
//             'Content-type': 'text/html',
//             'my-header': 'hello mother fucker'
//         })
//         response.end(html.replace('{{%CONTENT%}}', "Contact Page"))
//         // PRODUCTS PAGE
//     } else if (path.toLocaleLowerCase() === "/products") {
//         if(!query.id) {
//             let productsHtmlArray = products.map((prod) => {
//                 return replaceHtml(productListHtml, prod)
//             })
//             let productResponse = html.replace('{{%CONTENT%}}', productsHtmlArray.join(','))
//             response.writeHead(200, {'Content-type' : 'text/html'})
//             response.end(productResponse)
//         } else {
//             let prod = products[query.id]
//             let productDetailResponseHtml = replaceHtml(productDetailHtml, prod)
//             response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml))
//         }
//         // console.log(productsHtmlArray.join(''))
//         // ERROR PAGE
//     } else {
//         response.writeHead(404, {
//             'Content-type': 'text/html',
//             'my-header': 'hello mother fucker'
//         })
//         response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not found"))
//     }
// })


//TODO - EMITTING & HANDLING EVENT (OBSERVER PATTERN)

// // let myEmitter = new events.EventEmitter();
// let myEmitter = new user();

// myEmitter.on('userCreated', (id, name) => {
//     return console.log(`New user ${name} with ID ${id} created`)
// })

// myEmitter.on('userCreated', (id, name) => {
//     return console.log(`New user ${name} with ID ${id} added to database`)
// })

// myEmitter.emit('userCreated', 101, "bich")


//TODO - STREAMS IN FILESYSTEM

// FIRST SOLUTION
/*
server.on('request', (req, res) => {
    fs.readFile('./files/large-file.txt', (err, data) => {
        if(err) {
            res.end("Something went wrong")
            return;
        }
        res.end(data)
    })
}) 
*/

// SECOND SOLUTION

// server.on('request', (req, res) => {

//     let rs = fs.createReadStream('./files/large-file.txt')

//     rs.on('data', (chunk) => {
//         res.write(chunk)
//     })

//     rs.on('end', () => {
//         res.end()
//     })

//     rs.on('error', (err) => {
//         res.end(err.message)
//     })
// })


// THIRD SOLUTION

// server.on('request', (req, res) => {
//     let rs = fs.createReadStream('./files/large-file.txt')
//     rs.pipe(res)
// })


const readline =  require('readline')
const fs = require('fs')
const http = require('http')
const path = require('path')

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

const html = fs.readFileSync('./template/index.html', 'utf-8')

const server = http.createServer((request, response) => {
    let path = request.url;
    
    if(path === "/" || path.toLocaleLowerCase() === "/home") {
        response.writeHead(200, {
            'Content-type' : 'text/html',
            'my-header' : 'hello mother fucker'
        })
        response.end(html.replace('{{%CONTENT%}}', "Home Page"))
    } else if (path.toLocaleLowerCase() === "/about") {
        response.writeHead(200, {
            'Content-type' : 'text/html',
            'my-header' : 'hello mother fucker'
        })
        response.end(html.replace('{{%CONTENT%}}', "About Page"))
    } else if (path.toLocaleLowerCase() === "/contact") {
        response.writeHead(200, {
            'Content-type' : 'text/html',
            'my-header' : 'hello mother fucker'
        })
        response.end(html.replace('{{%CONTENT%}}', "Contact Page"))
    } else {
        response.writeHead(404, {
            'Content-type' : 'text/html',
            'my-header' : 'hello mother fucker'
        })
        response.end(html.replace('{{%CONTENT%}}', "Error 404: Page not found"))
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Server has started")
})

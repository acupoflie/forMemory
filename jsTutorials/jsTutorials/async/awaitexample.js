




//! WITH PROMISE
// document.querySelector("#buton").addEventListener("click", () => {
//     fetch("https://jsonplaceholder.typicode.com/posts/1")
//     .then((response) => response.json())
//     .then((post) => {
//         fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
//         .then((response) => response.json())
//         .then((comments) => console.log(comments))
//     })
// });



//WITH ASYN AWAIT
document.querySelector("#buton").addEventListener("click", async () => {
    const responsePost = await (await fetch("https://jsonplaceholder.typicode.com/posts/1")).json();
    // const post = await responsePost.json();

    const responseComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
    const comments = await responseComments.json();

    console.log(comments)
})



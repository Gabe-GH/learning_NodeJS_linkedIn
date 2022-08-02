// Convert callbacks to async/await

function MyFunction() {
    GetMessages((list) => {
        console.log(list);
    })
}
// Solution to challenge

// Challenge function
function MyFunction() {
    GetMessages((list) => {
        console.log(list);
    })
}

// Challenge Solution
async function Myfucntion() {
    const list = await GetMessages();
    console.log(list);
}
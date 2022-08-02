// Solution to challenge

// Challenge function
function myFunction() {
    request((res, err) => console.log(result,err));
}

// Challenge Solution
async function myFunction() {
    try {
        const result = await request();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
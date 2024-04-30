
// get random item out of list passed to it
function getRandomItem(list) {
    if (list.length === 0) {
        return null; 
    }
    const randomIndex = Math.floor(Math.random() * list.length);

    return list[randomIndex];
}

module.exports = { getRandomItem };
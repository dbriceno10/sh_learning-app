
/* const Category = require('../../models/Category'); */


const filterCategory = async (name, array) =>{
    try{

        let filterCat = await array.filter(c => c.name === name)
        return filterCat

    } catch (error) {
        console.log(error)
    }
}

moodule.exports = {
    filterCategory,
}

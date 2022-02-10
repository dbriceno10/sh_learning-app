
/* const Category = require('../../models/Category'); */


const filterCategory = async (name, array) =>{
    try{
        console.log("ARRAYYYYYYYYYYYYYYYYYYYYYYYYYYYYY", array)
        let filterCat = await array.filter(e => e.category.includes(name))//name es la categoria que llega por query
        console.log("FILTERACACASDRTASERTSDCACDSACQQQQQQ", filterCat) 
        return filterCat

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    filterCategory,
}

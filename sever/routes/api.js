const express = require('express')
const router = express.Router()
const urllib = require('urllib');

let recipes = []
function fetchRecipes(allrecipesData) {
     let recipes = []
     recipes = allrecipesData.map(r => {
        return {
            title: r.title, thumbnail: r.thumbnail,
            href: r.href,
            ingredients:r.ingredients
        }
    })
    return {recipes}

}



router.get('/recipes/:ingredient', (req, res) => {
    const ingredient = req.params.ingredient

    urllib.request(`https://recipes-goodness.herokuapp.com/recipes/${ingredient}`,
        function (err,data, response) {
            allrecipesData=JSON.parse(data.toString()).results
            recipes = fetchRecipes(allrecipesData)
            res.send(recipes)
            
        })

})
router.get('/sanity', (req, res) => {
    res.send("ok")
})
module.exports = router

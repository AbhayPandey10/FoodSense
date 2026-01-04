import express from 'express'
import cors from 'cors'
import {checkIngredients} from './settingAi.js'
import {mockDatabase} from './mockDatabase.js'
const app = express()

app.use(cors())
app.use(express.json())

app.listen(3000)

// id for accessing mock data
let id = 0
let ingredients = ""

// middleware for updating id after each render
const idFetcher = (req,res,next)=>{
    id += 1
    next()
}


app.get('/cameraInput',idFetcher,(req,res)=>{
    // only 3 mock data inputs, so looping over them as id = 1,2,3 only
    console.log("Camera request sent")
    if(id == 4){
        id = 1
    }
    for(let i=0;i<mockDatabase.length;i++){
        if(parseInt(mockDatabase[i].id)==id){
            ingredients = mockDatabase[i].ingredients;
            break;
        }
    }
    const data = async()=>{
        const result = await checkIngredients(ingredients)
        res.json(result)
        return
    }
    data()

})

// for actual text input, that can be anything.
app.post('/textInput',(req,res)=>{

    const {ingredients} = req.body

    const data = async()=>{
        const result = await checkIngredients(ingredients)
        res.json(result)
        return
    }
    data()
})
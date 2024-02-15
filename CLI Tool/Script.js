#!/usr/bin/env node
const fs = require('node:fs')
const inquirer = require('inquirer')
// const yargs = require('yargs')
// const {argv} = yargs(process.argv)
const prompt = inquirer.createPromptModule(),readPrompt = inquirer.createPromptModule(),writePrompt = inquirer.createPromptModule(),textPrompt = inquirer.createPromptModule()
const WriteText = (name,text) => {
    fs.writeFile(name,text,'utf-8',(error) => {
        if(error) throw error;
        console.log("File is created")
    })
}
const readText = (name) => {
    fs.readFile(__dirname + `/${name}`,{encoding:'utf-8'},(error,data) => {
        if(data)
            console.log(data)
        else
            throw error
    })
}

//CLI Prompt messager
prompt([{
    type:'input',
    name:'choice',
    message:'Read or write File:'
}]).then(choice => {
    choice.choice = String(choice.choice).toLocaleLowerCase()
    if(choice.choice == 'read'){
        readPrompt([{
            type:'input',
            name:'FileName',
            message:'Enter the file Name: '
        }]).then(FileName => {
            readText(FileName.FileName)
        })
    }
    else if(choice.choice == 'write'){
        writePrompt([{
            type:'input',
            name:'FileName',
            message:'Enter the file Name: '
        }]).then(Name => {
            if(!Name.FileName.length <= 0){
                textPrompt([{
                    type:'input',
                    name:'text',
                    message:'Enter content for the file: '
                }]).then(text => {
                    console.log(text.text)
                    if(!text.text.length <= 0){
                        WriteText(Name.FileName,text.text)
                    }
                })
            }
        })
    }
    else{
        console.log("Please choose to either read or write to a file")
    }
})
const mongoose = require("mongoose");

const addSingleData=async(data,Table)=>{
    const info = new Table(data)
    return await info.save()
}

const getRecordAggregate=async(aggregateArray,Table)=>{
    return await Table.aggregate(aggregateArray)
}

const getsingledata=async(value,Table)=>{
    return await Table.findOne(value)
}

const getalldata=async(Table)=>{
    return await Table.find()
}

module.exports={
    addSingleData,
    getalldata,
    getRecordAggregate,
    getsingledata
}
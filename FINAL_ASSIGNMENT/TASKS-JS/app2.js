//==================================================================================================================================================
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json())

// Enable CORS
app.use(cors());

const userModel = require("./mongo");   // importing the mongodb skeleton
//========================================FUNCTIONS================================

//FUNCTION TO GET MIN STARTEDON DATE OF CHILDREN TASKS

function getmin(childtasks){
  console.log("childtasks at getmin")
  console.log(childtasks)
  console.log("to get minimum date- inside getmin function")
  mindate = childtasks[0].StartedOn;
  console.log({mindate,msg:"initial mindate of the children"})

  for (i=1;i < childtasks.length;i++){
    if (childtasks[i].StartedOn<mindate){
      mindate= childtasks[i].StartedOn
    }
  }

  console.log({mindate,msg:"this is the updated min date of the parent"});

  return (mindate) //return the minimum date of parent ID
}
//=================================================================================

//FUNCTION TO UPDATE THE COMPLETEDON

function getmax(childtasks){
  console.log("to get maximum date- inside getmax function");
  maxdate = childtasks[0].CompletedOn;
  console.log(typeof(maxdate))
  console.log({maxdate,msg:"initial maxdate of the children"})

  for (i=1; i<childtasks.length;i++){

    console.log(childtasks[i].CompletedOn)
    tx= childtasks[i].CompletedOn;
    console.log(typeof(tx))
    if (tx>maxdate){

      maxdate = childtasks[i].CompletedOn;

    }
  }

  console.log({maxdate,msg:"this is the updated max date of the parent"})

  return (maxdate) //returns the maximum date of the parent
}

//=================================================================================
//TO ADD THE WEIGHTS OF THE CHILDTASKS AND REFLECTING IT TO PARENT.
function getadd(childtasks){

  let weight = 0;
    for (i=0;i<(childtasks.length);i++){
      weight+= childtasks[i].Weightage
    }

    console.log(weight,{msg:"weight of the parent "})
  
    return weight; //returns the weightage of the parent

}

//=================================================================================

//TO UPDATE STARTEDON, COMPLETEDON, WEIGHTAGE
function segregatedata(data,parentId){

  let parId= parentId.toString(); //typeof = number to string

  console.log("..........................at segregatedata function.................................")
  let childrens =[]   //an array to store the childtasks

  // LOOP TO GET THE CHILDTASKS OF PARENT
  for (let i=1; i<data.length;i++){
      // console.log("===========================")
      // console.log("this is the refid of this item")
      // console.log(data[i].refid)
      // console.log(data[i].wbs)
      // console.log(data[i].StartedOn)
    if((data[i].refid) === (parId)){
        let wbs = data[i].wbs;
        let refid = data[i].refid;
        let StartedOn = data[i].StartedOn;
        let CompletedOn = data[i].CompletedOn;
        let Weightage = data[i].Weightage;
        let Milestone =  data[i].Milestone;

        const date = {
            wbs, refid,StartedOn, CompletedOn,Weightage,Milestone
            
        }

        childrens.push (date); 
    }

    // else{console.log("no children")}
  }

  //======================================

  if (childrens.length>0){
  console.log("this is the child of parent with wbs-",parId);
  console.log(childrens)}

  if (childrens.length>0){  //should call those functions only if it contains any childtasks

  //calling functions
  min = getmin(childrens) //to update the startedon
  console.log({msg:"minimum startedon:",min})
  
  max = getmax(childrens) //to update the completedon
  console.log({msg:"maximum startedon:",max})

  wei = getadd(childrens) //to update the weightage
  console.log({msg:"updated weights of parent:",wei});

  //FINDING THE PARENT TO UPDATE THE ABOVE DATA
  const par = childrens[0].refid
  console.log("this is the id of tha parent..................................");
  console.log(par)
  console.log(typeof(par))

  for (let i=0; i<data.length;i++){
    // console.log("at for loop-updating parent")
    let ty = data[i].wbs;
    typ= ty.toString();

    if (typ === par){
        data[i].StartedOn=min; //updating startedon of parent
        data[i].CompletedOn=max; //updating completedon of parent
        data[i].Weightage=wei; //updating weightage of parent

        console.log("this is the parent with updated data")
        console.log(data[i])
    }};

  //====================for grand child====================
  //to get the grandchild of children and should run a loop after the functions on the same grandchild to find childest and further more....

  for(let i=0;i<childrens.length;i++){
    console.log("childrens at [for grand child --for loop]")
    console.log(childrens)
    if (childrens.length>0){
    taskid = childrens[i].wbs;
    console.log("value of taskid in for loop for grand child")
    console.log(taskid)
    for (let j=0;j<data.length;j++){
      // console.log("data[j] in for loop at grand child")
      // console.log(data[j])
      if (data[j].refid === taskid){
        // console.log("at grandchild for loop, data[j].refid:=")
        //   console.log(data[j].refid)
          console.log("calling segregatedata function......")
          segregatedata(data,taskid)
      }

      

  }
  }};
  console.log("============finish until here================")
  //===========================================================================================================================================
  //========to update the parent task again with its updated child tasks=========== 
    // initially the parent task with parenId 0 is being updated with its child tasks 2,6,12
    // but upon further updates in those child tasks because of their childtasks, the parent task is not being updated
    // so to make the parent task also up to date considering those updated child tasks again as childrens of the parent and updating new dates
    
    let parentchildrens =[]   //an array to store the childtasks

    for (let i=1; i<data.length;i++){

      if(data[i].refid === parId){
        let wbs = data[i].wbs;
        let refid = data[i].refid;
        let StartedOn = data[i].StartedOn;
        let CompletedOn = data[i].CompletedOn;
        let Weightage = data[i].Weightage;
        let Milestone =  data[i].Milestone;

        const date = {
            wbs, refid,StartedOn, CompletedOn,Weightage,Milestone
            
        }

        parentchildrens.push (date);
      }};

      console.log("updated children of main parent 1:");
      console.log(parentchildrens)
      //CALLING FUNCTIONS

      if (parentchildrens.length>0){
      min = getmin (parentchildrens); //startedon
      max = getmax(parentchildrens);  //completedon
      wei =getadd(parentchildrens);

    //FINDING THE PARENT
    const par2 = parentchildrens[0].refid
    
    console.log("this is the id of tha parent at seg2..................................");
    console.log(par2)

    
    for (let i=0; i<data.length;i++){
      tx = data[i].wbs
      ty= tx.toString()
        if (ty === par2){
            data[i].StartedOn=min; //updating startedon of parent
            data[i].CompletedOn=max; //updating completedon of parent
            data[i].Weightage=wei
        }

    }
    console.log("Updated parent")
    console.log(data[i])
  }

  return (data)

  
  
  } //if children >0

}  //EOF



//==================================================================================================================================================
app.get('/', (req, res) => {
    res.send('Server is up and running'); // or any other response you want to send
    
});
//======================================================
app.post("/updates",(req,res)=>{
    console.log("at updates upi, the data is :")
    const data = req.body;

    //========================
    //TO REMOVE TASK KEY IN OBJECTS[BECAUSE STRING USE TO REPLACE THE TITLE OF THE TASK]
    for (item of data){
    var keys = Object.keys(item);
    var position = 0; // Specify the position of the key-value pair you want to remove
    
    if (position >= 0 && position < keys.length) {
      var keyToRemove = keys[position];
      delete item[keyToRemove];
    }};
    //========================
    
    console.log("DATA AFTER DELETING TASK:------------------------------------------")
    // console.log(data)
    
    //========================

    for (let i=0;i<data.length;i++){
      if (data[i].refid===''){
        
        const parentId = data[i].wbs
        console.log("===================================")
        console.log("this is the parent with no refid")
        console.log(data[i])
        console.log("msg:this is the parentID ",parentId)

        //calling functions......
        segdata = segregatedata(data,parentId); //this function follows the rolling up approach

        console.log("===========================================================================================================")
        console.log("UPDATED DATA RETURNED FROM SEGDATA:")
        console.log(segdata)

        console.log("===========================================================================================================")
      }};
    
});




//====================================================================================================================================
app.listen(4000,()=>{
    console.log("app running at port 4000")
});
//====================================================================================================================================

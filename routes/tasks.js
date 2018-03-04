const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/my_task_list',['tasks']);  

//Create Task
router.post('/createTask', (req,res,next) => {
    var task = req.body;
    if(task.title == "" || task.isDone == ""){
        res.status(400);
        res.json({
            "error" : 'Bad Data'
        });
    }else{
            db.tasks.save(task, function(err, task){
            if(err)
            {
                res.send(err);
            }
            res.json(task);
        });
    }
});

//Get Single Task
router.get('/getTask/:id', (req,res,next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err)
        {
            res.send(err);
        }
        res.json(task);
    });
}); 

//Get All Tasks
router.get('/getTasks', (req,res,next) => {
    db.tasks.find(function(err, tasks){
        if(err)
        {
            res.send(err);
        }
        res.json(tasks);
    });
});

//Update a Task
router.put('/updateTask/:id', function (req, res) {
    var updtTask = {
        title : req.body.title,
        isDone : req.body.isDone  
        }
     db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updtTask, {}, function(err, task){
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(task);
    });
  });


//Delete All Tasks
router.delete('/deleteTask/:id', (req,res,next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err)
        {
            res.send(err);
        }
        res.json(task);
    });
});

module.exports = router; 
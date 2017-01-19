var express = require('express');
var router = express.Router();
var Message = require('../models/message');

//find message

router.get('/', function(req, res, next) {

  Message.find()
    .exec(function(err, messages) {
     if(err) {
       return res.status(500).json({
         title: 'An error occurred',
         error: err
       });
     }
     res.status(200).json({
       message: 'Success',
       obj: messages
     })
  });
});

//save message

router.post('/', function(req, res, next) {

  var message = new Message({
    content: req.body.content
  });
  message.save(function(err, result) {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved message',
      obj: result
    });
  });
});

//update message

router.patch('/:id', function(req, res, next) {

  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!message) {
      return res.stats(500).json({
        title: 'No Message Found',
        error: {
          message: 'Message Not Found'
        }
      });
    }
    message.content = req.body.content;
    message.save(function(err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

//delete message

router.delete('/:id', function(req, res, next) {

  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!message) {
      return res.stats(500).json({
        title: 'No Message Found',
        error: {
          message: 'Message Not Found'
        }
      });
    }
    message.remove(function(err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;
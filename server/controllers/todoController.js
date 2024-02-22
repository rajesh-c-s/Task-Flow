import express from "express";
import { todoModel } from "../models/todoModel.js";
import mongoose from "mongoose";

/*-----------------getTodos-----------------*/
export const getTodos = async (req, res) => {
  //console.log(req.user._id)
  try {
    const todos = await todoModel.find({ user: req.user._id });
    console.log("Hello");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*-----------------createTodo-----------------*/
export const createTodo = async (req, res) => {
    const { title, description, completed} = req.body;
 
  try {
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const newTodo = await todoModel.create({
      title,
      description,
      completed,
      user: req.user._id,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/*-----------------updateTodo-----------------*/
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
  
    try {
      const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

/*-----------------deleteTodo-----------------*/
export const deleteTodo = async (req, res) => {
   const { id } = req.params;
  try {
    const deletedTodo = await todoModel.findByIdAndDelete(id);
   console.log(deletedTodo)
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

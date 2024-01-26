const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

const TableName = process.env.TABLE_NAME;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());


app.get("/tasks", async function (req, res) {
  try {
    const command = new ScanCommand({
      TableName: TableName,
    });
    const { Items } = await dynamoDbClient.send(command);
    res.status(200).json({ allTasks: Items });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching items!" });
  }
});

app.get("/tasks/:taskId", async function (req, res) {
  const params = {
    TableName: TableName,
    Key: {
      taskId: req.params.taskId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    if (Item) {
      const { title, desc, date } = Item;
      res.status(200).json({ title, desc, date });
    } else {
      res
        .status(404)
        .json({ message: 'Could not find user with provided "taskId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Couldn't retrieve the task!" });
  }
});

app.post("/tasks", async function (req, res) {
  const { taskId, title, desc, date } = req.body;
  const params = {
    TableName: TableName,
    Item: {
      taskId: taskId,
      title: title,
      desc: desc,
      date: date,
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    res.status(201).json({ title, desc, date });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not create user" });
  }
});

app.put("/tasks/:taskId", async (req, res) => {
  try {
    const values = req.body;
    const updateExpression =
      "SET " +
      Object.keys(values)
        .map((field, index) => `#${field} = :value${index}`)
        .join(", ");
    const expressionAttributeNames = Object.keys(values).reduce(
      (acc, field) => {
        acc[`#${field}`] = field;
        return acc;
      },
      {}
    );
    const expressionAttributeValues = Object.keys(values).reduce(
      (acc, field, index) => {
        acc[`:value${index}`] = values[field];
        return acc;
      },
      {}
    );
    const command = new UpdateCommand({
      TableName,
      Key: {
        taskId: req.params.taskId,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW",
    });
    await dynamoDbClient.send(command);
    res.status(200).json({ message: "Task updated!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Unable to update the task!" });
  }
});

app.delete("/tasks/:taskId", async (req, res) => {
  try {
    const command = new DeleteCommand({
      TableName,
      Key: {
        taskId: req.params.taskId,
      },
      ReturnValues: "ALL_OLD",
    });
    await dynamoDbClient.send(command);
    res.status(200).json({ message: "Task deleted!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Unable to delete the task!" });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: "404 not found!" });
});

module.exports.handler = serverless(app);

import { DynamoDBClient, ListTablesCommand, } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, UpdateCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();


const client = new DynamoDBClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },

});
const docClient = DynamoDBDocumentClient.from(client);


export const listTables = async () => {
    const command = new ListTablesCommand({});

    const response = await docClient.send(command);
    return response;
};



export const addTodo = async (
    userId, todoListId, todoTitle, todoId
) => {
    const command = new PutCommand({
        TableName: "TodosTable",
        Item: {
            userId: userId,
            createdAt: new Date(Date.now()).toISOString(),
            todoListId: todoListId,
            todoTitle: todoTitle,
            todoId: todoId,
            complete: false

        },
    });
    const response = await docClient.send(command);
    return response;
};



export const updateTitle = async (
    todoId, todoTitle
) => {
    const command = new UpdateCommand(
        {
            TableName: "TodosTable",
            Key: {
                todoId: todoId,
            },
            UpdateExpression: "SET todoTitle = :newTitle",
            ExpressionAttributeValues: {
                ":newTitle": todoTitle,
            },
            ReturnValues: "UPDATED_NEW"
        }
    )
    const response = await docClient.send(command);
    return response;
};

export const updateComplete = async (
    todoId, complete
) => {
    const command = new UpdateCommand(
        {
            TableName: "TodosTable",
            Key: {
                todoId: todoId,
            },
            UpdateExpression: "SET complete = :complete",
            ExpressionAttributeValues: {
                ":complete": complete,
            },
            ReturnValues: "UPDATED_NEW"
        }
    )
    const response = await docClient.send(command);
    return response;
};

export const deleteItem = async (todoId) => {
    const command = new DeleteCommand(
        {
            TableName: "TodosTable",
            Key: {
                todoId: todoId,
            },

        }
    )
    const response = await docClient.send(command);
    return response;
}


export const getTodos = async (userId) => {
    const command = new ScanCommand({
        TableName: "TodosTable",
        FilterExpression:
            "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        },
        ConsistentRead: true,
    });

    const response = await docClient.send(command);
    const groupedByTodoListId = response.Items.reduce((acc, item) => {
        if (!acc[item.todoListId]) {
            acc[item.todoListId] = [];
        }
        acc[item.todoListId].push(item);
        return acc;
    }, {});



    return groupedByTodoListId;

};

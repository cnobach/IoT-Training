module.exports = {
    openapi: "3.0.3",
    info: {
        title: "Radioshack 2.0 API",
        description: "IoT Training API",
        version: "1.0.0",
        contact: {
            name: "Connor Nobach",
            email: "connor.nobach@tcs.com",
            url: "https://github.com/cnobach"
        }
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: "Local Server"
        }
    ],
    tags: [
        {
            name: "Users CRUD operations",
        },
        {
            name: "Items CRUD operations"
        }
    ],
    components: {
        schemas: {
            // Users Model
            users: {
                type: "object",
                properties: {
                    ID: {
                        type: "serial",
                        description: "Identification number of a user",
                        example: 5
                    },
                    name: {
                        type: "string",
                        description: "Users name",
                        example: "John Doe"
                    },
                    password: {
                        type: "string",
                        description: "A users password",
                        example: "password11234"
                    },
                    email: {
                        type: "string",
                        description: "A users email",
                        example: "johndoe@example.com"
                    },
                    address: {
                        type: "string",
                        description: "A users address",
                        example: "1234 sesame st"
                    },
                    city: {
                        type: "string",
                        description: "The city a user lives in",
                        example: "Seattle"
                    },
                    state: {
                        type: "string",
                        description: "The state a user lives in",
                        example: "Washington"
                    },
                    zip: {
                        type: "integer",
                        description: "The zip code the user lives in",
                        example: 98101
                    }
                }
            },
            // Items Model
            items: {
                type: "object",
                properties: {
                    ID: {
                        type: "serial",
                        description: "Identification number of an item",
                        example: 5
                    },
                    name: {
                        type: "string",
                        description: "Items name",
                        example: "Macbook Pro"
                    },
                    date: {
                        type: "date",
                        description: "Date the item was added",
                        example: '2022 - 03 - 23'
                    },
                    description: {
                        type: "string",
                        description: "Description of the item",
                        example: "SCool and stupid expensive laptop."
                    },
                    price: {
                        type: "numeric",
                        description: "Price of the object",
                        example: "2499.99"
                    }
                }
            }
        }
    },

    paths: {
        "/users": {
            get: {
                tags: ["Users CRUD operations"],
                description: "Get all Users",
                operationId: "getAllUsers",
                parameters: [],
                responses: {
                    200: {
                        description: "Users were returned.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users"
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Users CRUD operations"],
                description: "Create a new user",
                operationId: "createUser",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/users"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "User created"
                    }
                }
            },
            put: {
                tags: ["Users CRUD operations"],
                description: "Update a user",
                operationId: "updateUser",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/users"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "User updated"
                    }
                }
            }
        },
        "/users/:id": {
            get: {
                tags: ["Users CRUD operations"],
                description: "Get a single user",
                operationId: "getById",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID of the User to get."
                    }
                ],
                responses: {
                    200: {
                        description: "User was returned.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users"
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Users CRUD operations"],
                description: "Delete a user",
                operationId: "deleteUser",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID of the User to delete."
                    }
                ],
                responses: {
                    200: {
                        description: "User was deleted.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/items": {
            get: {
                tags: ["Items CRUD operations"],
                description: "Get all Items",
                operationId: "getAllUsers",
                parameters: [],
                responses: {
                    200: {
                        description: "Items were returned.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/items"
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Items CRUD operations"],
                description: "Create a new item",
                operationId: "createUser",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/items"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Item created"
                    }
                }
            },
            put: {
                tags: ["Items CRUD operations"],
                description: "Update a item",
                operationId: "updateUser",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/items"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Item updated"
                    }
                }
            }
        },
        "/items/:id": {
            get: {
                tags: ["Items CRUD operations"],
                description: "Get a single item",
                operationId: "getById",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID of the Item to get."
                    }
                ],
                responses: {
                    200: {
                        description: "Item was returned.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/items"
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Items CRUD operations"],
                description: "Delete a item",
                operationId: "deleteUser",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID of the Item to delete."
                    }
                ],
                responses: {
                    200: {
                        description: "Item was deleted.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/items"
                                }
                            }
                        }
                    }
                }
            }
        },
    },
}
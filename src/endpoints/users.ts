
import { D1CreateEndpoint, D1ReadEndpoint, D1ListEndpoint } from "chanfana";
import { z } from "zod";


// Define the User Model
const UserModel = z.object({
    id: z.number(),
    created: z.string().datetime(),
    rolename: z.string().min(5),
    email: z.string().email(),
    useruuid: z.string().uuid(),
});

// Define the Meta object for User
const createMeta = {
    model: {
        schema: z.object({rawdata: z.string().max(1024)}),
        tableName: 'users', // Table name in D1 database
    },
};
const userMeta = {
    model: {
        schema: UserModel,
        primaryKeys: ['id'],
        tableName: 'users', // Table name in D1 database
    },
};

export class CreateUser extends D1CreateEndpoint { _meta = createMeta; dbName = "DB"; }
export class GetUser extends D1ReadEndpoint { _meta = userMeta; dbName = "DB"; }
export class ListUsers extends D1ListEndpoint { _meta = userMeta; dbName = "DB"; }


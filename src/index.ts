import { fromHono } from "chanfana";
import { Hono } from "hono";

//import { TaskDelete } from "./endpoints/taskDelete";
//import { TaskFetch } from "./endpoints/taskFetch";
import { CreateUser, GetUser, ListUsers } from "./endpoints/users";
import { CreateLesson, GetLesson, ListLessons } from "./endpoints/lessons";
import { CreateCourse, GetCourse, ListCourses } from "./endpoints/courses";

// Start a Hono app
const app = new Hono<{ Bindings: { DB: D1Database }}>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
//openapi.get("/api/tasks/:taskSlug", TaskFetch);
//openapi.delete("/api/tasks/:taskSlug", TaskDelete);
openapi.get("/api/users", ListUsers);
openapi.post("/api/users", CreateUser);
openapi.get("/api/users/:id", GetUser);
openapi.get("/api/lessons", ListLessons);
openapi.post("/api/lessons", CreateLesson);
openapi.get("/api/lessons/:id", GetLesson);
openapi.get("/api/courses", ListCourses);
openapi.post("/api/courses", CreateCourse);
openapi.get("/api/courses/:id", GetCourse);

// Export the Hono app
export default app;

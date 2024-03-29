import AuthService, { CourseAuth } from "../middleware/auth.middleware";
import { Account } from "../models/auth-models";
import User from "../models/User";
import { Course } from "../models/course";

const Auth = new AuthService(Account, User);

const courseAuth = new CourseAuth(Course, Account, User);

export { Auth, courseAuth }
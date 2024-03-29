import { Express } from 'express-serve-static-core';
import User from '../../src/models/User';
import { Account } from '../../src/models/auth-models';
import { Course } from '../../src/models/course';
import { Enrollment } from '../../src/models/enrollment';
import Post from '../../src/models/post';
import { Document } from 'mongoose';

declare global {
    
    namespace Express {
    
        export interface Request {
    
            profile: Document<typeof User>
            account: Document<typeof Account>
            role: string
            course: Document<typeof Course>
            enrollment: Document<typeof Enrollment>
            
        }
    }
}


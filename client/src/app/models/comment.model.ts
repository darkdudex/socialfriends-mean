import { User } from "./user.model";

export interface Comment {

	_id: string
	comment: string
	creationDate: Date
	publicationId: string
  userId: User
  
}
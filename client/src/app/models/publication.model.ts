import { Like } from "./like.comment";
import { User } from "./user.model";

export interface Publication {

	_id: string
	userId : User
	totalComment: number
	message: string
	like: Like
	comment: Array<Comment>
	indexCommentPagination: number
	filePublication: Array<File>
	creationDate: Date
  totalLike: number
  
}
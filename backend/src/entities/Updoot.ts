import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Updoot extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToMany(() => User, (user) => user.updoots)
  user: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.updoots)
  post: Post;
}

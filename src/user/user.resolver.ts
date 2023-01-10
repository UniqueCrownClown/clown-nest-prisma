import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
} from '@nestjs/graphql';
import { Inject, Logger } from '@nestjs/common';
import { PostCreateInput } from 'src/post/post.resolver';
import { User } from './dto/user';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from 'src/post/dto/post';
import { hash as argonHash } from 'argon2';


@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}

@InputType()
class UserCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  password: string;

  @Field((type) => [PostCreateInput], { nullable: true })
  posts: [PostCreateInput];
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  async posts(@Root() user: User, @Context() ctx): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .posts();
  }

  @Mutation((returns) => User)
  async signupUser(
    @Args('data') data: UserCreateInput,
    @Context() ctx,
  ): Promise<User> {
    const postData = data.posts?.map((post) => {
      return { title: post.title, content: post.content || undefined };
    });
    const hash = await argonHash(data.password);
    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        hash: hash,
        isAdmin: true,
        posts: {
          create: postData,
        },
      },
    });
  }

  @Query((returns) => [User], { nullable: true })
  async allUsers(@Context() ctx) {
    return this.prismaService.user.findMany();
  }

  @Query((returns) => [Post], { nullable: true })
  async draftsByUser(
    @Args('userUniqueInput') userUniqueInput: UserUniqueInput,
    @Context() ctx
  ): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userUniqueInput.id || undefined,
          email: userUniqueInput.email || undefined,
        },
      })
      .posts({
        where: {
          published: false,
        },
      });
  }
}

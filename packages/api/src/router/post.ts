import { t } from "../trpc";
import { z } from "zod";

export const postRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  byId: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findFirst({ where: { id: input } });
  }),
  add: t.procedure.input(z.object({
    title: z.string().max(30),
    content: z.string().max(50)
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.post.create({ data: {title: input.title, content: input.content} });
  }),

});

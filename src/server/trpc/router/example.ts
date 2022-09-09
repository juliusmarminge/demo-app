import { t, authedProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = t.router({
  hello: t.procedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getById: t.procedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.example.findFirst({
      where: {
        id: input,
      },
    });
  }),
  getAll: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  create: authedProcedure.input(z.string()).mutation(({ input, ctx }) => {
    return ctx.prisma.example.create({
      data: {
        text: input,
      },
    });
  }),
});
